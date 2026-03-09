'use server'
import 'server-only'

import orm from '../database'

import getAuthUser from '@/lib/auth/get-user'

import { userCanAddAnalysis, userCanDeleteAnalysis } from '@/lib/auth/acl'

import tranformFromDb from '../transformers/from-db/analysis'
import tranformToDb from '../transformers/to-db/analysis'

const getOrderByClause = (tri, direction) => {
  const sortDirection = direction ?? 'asc'

  if (tri === 'nom_groupe') {
    return {
      analysisGroup: {
        name: sortDirection
      }
    }
  } else {
    return {
      name: sortDirection
    }
  }
}

const getWhereClauseFromParams = (params) => {
  const { secteur, tri, direction, texte: texteRaw } = params

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined

  const whereClause = {
    analysisGroup: {
      analysisSector: {
        id: secteur ? { in: secteur } : undefined
      }
    },
    OR: texte ? [
      { name: { contains: texte, mode: 'insensitive' } },
      { analysisGroup: {
          name: texte ? { contains: texte, mode: 'insensitive' } : undefined
        }
      }
    ] : undefined
  }

  return whereClause
}

const getAnalysesCount = async (params) => {
  const user = await getAuthUser()

  if (!user) {
    return []
  } else {
    const { isAdmin } = user
    if (!isAdmin) {
      return []
    }
  }

  const whereClause = getWhereClauseFromParams(params)

  const count = await orm.LutAnalysis.count({
    where: whereClause
  })

  return count
}

const getAnalyses = async (params) => {
  const { tri, direction, offset = 0, take = 25 } = params

  const user = await getAuthUser()

  if (!user) {
    return []
  } else {
    const { isAdmin } = user
    if (!isAdmin) {
      return []
    }
  }

  const whereClause = getWhereClauseFromParams(params)
  const orderByClause = getOrderByClause(tri, direction)

  const analyses = await orm.LutAnalysis.findMany({
    include: {
      resultType: true,
      analysisGroup: {
        include: {
          analysisSector: true
        }
      }
    },
    where: whereClause,
    orderBy: orderByClause,
    skip: (offset * take),
    take
  })

  // id, name, code, groupName, sectorName, resultType

  const payload = analyses.map(a => {
    const { id, name, code, analysisGroup } = a
    const { name: groupName, analysisSector } = analysisGroup
    const { name: sectorName } = analysisSector
    return {
      id,
      name,
      code,
      groupName,
      sectorName
    }
  })

  return payload
}

const getAnalysis = async (id) => {
  const user = await getAuthUser()

  if (!user) {
    return []
  } else {
    const { isAdmin } = user
    if (!isAdmin) {
      return null
    }
  }

  const analysis = await orm.LutAnalysis.findUnique({
    where: {
      id
    },
    include: {
      resultType: true,
      codeValues: true,
      analysisGroup: {
        include: {
          analysisSector: true
        }
      }
    }
  })

  return tranformFromDb(analysis, { user })
}

const addAnalysis = async (eventId, data) => {
  const user = await getAuthUser()

  if (!user) {
    throw new Error()
  }

  const event = await orm.event.findFirst({
    where: {
      id: eventId
    }
  })

  if (!event) {
    throw new Error()
  }

  const { programId } = event

  if (!userCanAddAnalysis(user, programId)) {
    throw new Error()
  }

  await orm.EventAnalysisGroup.create({
    data: {
      eventId,
      ...data
    }
  })

  return true
}

const deleteAnalysis = async (eventId, analysisGroupId) => {
  const user = await getAuthUser()

  if (!user) {
    throw new Error()
  }

  const analysis = await orm.EventAnalysisGroup.findUnique({
    where: {
      eventId_analysisGroupId: {
        eventId, analysisGroupId
      }
    },
    include: {
      event: {
        include: {
          program: true
        }
      }
    }
  })

  const { event } = analysis
  const { program } = event 
  const { id: programId } = program

  const canDelete = userCanDeleteAnalysis(user, programId)

  if (!canDelete) {
    throw new Error()
  }

  await orm.EventAnalysisGroup.delete({
    where: {
     eventId_analysisGroupId: {
        eventId, analysisGroupId
      }
    }
  })

  return true
}

const newAnalysis = async (data) => {
  const { isNewGroup, name, resultType, analysisGroup, analysisSector, newGroupName } = data

  return await orm.$transaction(async (prisma) => {
    let newAnalysisGroup = null 

    if (isNewGroup) {
      newAnalysisGroup = await prisma.LutAnalysisGroup.create({
        data: {
          name: newGroupName ?? name,
          analysisSectorId: analysisSector.id
        }
      })
    } else {
      newAnalysisGroup = analysisGroup
    }

    const newAnalysis = await prisma.LutAnalysis.create({
      data: {
        name,
        analysisGroupId: newAnalysisGroup.id,
        resultTypeId: resultType.id
      }
    })

    return { data: { ...newAnalysis }, errors: null }
  })
}

const updateAnalysis = async (analysisId, data) => {
  const user = await getAuthUser()

  if (!user) {
    throw new Error()
  }

  const { isAdmin } = user

  if (!isAdmin) {
    throw new Error()
  }

  const payload = tranformToDb(data, { user })
  
  const updatedAnalysis = await orm.LutAnalysis.update({
    where: {
      id: analysisId
    },
    data: payload,
    include: {
      resultType: true,
      codeValues: true,
      analysisGroup: {
        include: {
          analysisSector: true
        }
      }
    }
  })

  return { data: { ...tranformFromDb(updatedAnalysis, { user }) }, errors: null }

}

const updateAnalysisGroupResults = async (data) => {
  const user = await getAuthUser()

  if (!user) {
    throw new Error()
  }
  const { analyses = [] } = data

  await orm.$transaction(async prisma => {
    for (const analysis of analyses) {
    const { id: analysisGroupId, results = [] } = analysis  
    for (const result of results) {
      
      const { id: resultId, value } = result
      await prisma.Result.update({
        where: {
          id: resultId
        },
        data: {
          value: value?.toString() || null
        }
      })
    }
  }
  })
    

}

export {
  getAnalyses,
  getAnalysesCount,
  getAnalysis,
  addAnalysis,
  newAnalysis,
  updateAnalysis,
  deleteAnalysis,
  updateAnalysisGroupResults
}
