'use server'
import 'server-only'

import { DateTime } from 'luxon'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { userCanAddAnalysis, userCanDeleteAnalysis } from '@/lib/auth/acl'

// import toDbSpecimenTransformer from '../transformers/to-db/specimen'

const addAnalysis = async (eventId, data) => {
  const user = await getUser()

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
  const user = await getUser()

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

const updateAnalysisGroupResults = async (data) => {
  
  const user = await getUser()

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
  addAnalysis,
  deleteAnalysis,
  updateAnalysisGroupResults
}
