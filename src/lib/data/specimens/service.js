'use server'
import 'server-only'

import { DateTime } from 'luxon'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { userCanDeleteSpecimen } from '@/lib/auth/acl'

import { filterViewablePrograms } from '@/lib/auth/acl'

import toDbSpecimenTransformer from '../transformers/to-db/specimen'

const getOrderByClause = (tri, direction) => {
  const sortDirection = direction ?? 'desc'

  switch (tri) {
    case 'id':
      return [{ eventId: sortDirection }, { sequenceId: sortDirection }]
    case 'date_signalement':
      return {
        event: {
          reportedAt: { sort: sortDirection, nulls: 'last' }
        }
      }
    default:
      return {
        event: {
          createdAt: sortDirection
        }
      }
  }
}

const DATE_MAP = {
  date_signalement: 'reportedAt',
  date_decouverte: 'discoveredAt',
  date_recolte: 'collectedAt'
}

const getPartialDateClause = (date, start, end) => {
  const fieldName = DATE_MAP[date] || 'reportedAt'

  const conditions = [
    start ? { [fieldName]: { gte: DateTime.fromFormat(start, 'yyyy-LL-dd').toJSDate() } } : null,
    end ? { [fieldName]: { lte: DateTime.fromFormat(end, 'yyyy-LL-dd').toJSDate() } } : null
  ]

  return {
    AND: conditions.filter(Boolean)
  }
}

const getWhereClauseFromParams = (params, user) => {
  const { statut, programme, region, groupe, texte: texteRaw, date, start, end } = params

  const { permissions } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined
  const isTextNumber = isNaN(texte) ? false : true

  const programsIds = programme ? programme : viewableProgramIds

  const partialDateClause = getPartialDateClause(date, start, end) 

  const whereClause = {
    specie: groupe ? { groupId: { in: groupe } } : undefined, 
    event: {
      statusId: statut ? { in: statut } : undefined,
      programId: { in: programsIds },
      location: {
        locality: {
          regionId: region ? { in: region } : undefined
        }
      },
      ...partialDateClause,
      OR: texte ? [
        { id: isTextNumber ? parseInt(texte, 10) : undefined },
        { silabId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
        { mapaqId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
        { pathologyNumber: texte ? { contains: texte, mode: 'insensitive' } : undefined },
        { submitter: { lastName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
        { submitter: { firstName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
        { location: {
            locality: {
              name: texte ? { contains: texte, mode: 'insensitive' } : undefined
            }
          }
        }
      ] : undefined
    }
  }

  return whereClause
}

const getSpecimensCount = async (params) => {
  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)

  const count = await orm.Specimen.count({
    where: whereClause
  })

  return count
}

const getSpecimens = async (params) => {
  const { tri, direction, offset = 0, take = 25 } = params

  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)
  const orderByClause = getOrderByClause(tri, direction)

  const specimens = await orm.Specimen.findMany({
    where: whereClause,
    include: {
      specie: true,
      event: {
        include: {
          type: true,
          program: true,
          submitter: true,
          location: {
            include: {
              locality: true
            }
          }
        }
      }
    },
    orderBy: orderByClause,
    skip: (offset * take),
    take
  })

  const payload = specimens.map(s => {
    const { id, eventId, sequenceId, cqsasNumber, specie, event } = s

    const { submitter, location, reportedAt } = event
    const { name: specieName, binome: specieBinome } = specie

    const submitterName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ')

    const locality = location?.locality
    const localityName = locality?.name

    return {
      id,
      eventId,
      sequenceId,
      specieName,
      specieBinome,
      cqsasNumber,
      reportedAt,
      submitterName,
      localityName
    }
  })

  return payload
}

const addSpecimen = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const newSpecimen = await orm.Specimen.create({
    data: {
      eventId,
      ...data
    }
  })

  return { data: newSpecimen }
}

const deleteSpecimen = async (id) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const specimen = await orm.Specimen.findFirst({
    where: {
      id
    },
    include: {
      event: {
        include: {
          program: true
        }
      }
    }
  })

  const { event } = specimen
  const { program } = event 
  const { id: programId } = program

  const canDeleteSpecimen = userCanDeleteSpecimen(user, programId)

  if (!canDeleteSpecimen) {
    throw new Error()
  }

  await orm.Specimen.delete({
    where: {
      id
    }
  })

  return true
}

const updateSpecimen = async (specimenId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const transformed = toDbSpecimenTransformer(data, { user })
 
  const { measures, ...rest } = transformed
  
  await orm.$transaction(async prisma => {
    await prisma.specimen.update({
      where: {
        id: specimenId,
      },
      data: rest
    })

    for await (const m of measures) {
      const { id: measureId, value, unit } = m
      const { id: unitId } = unit
      const data = { value, unitId }
      await prisma.specimenMeasure.update({
        where: {
          id: measureId,
        },
        data
      })
    }
  })


  return null
}

export {
  getSpecimens,
  getSpecimensCount,
  addSpecimen,
  deleteSpecimen,
  updateSpecimen
}
