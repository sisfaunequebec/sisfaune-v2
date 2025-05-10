'use server'
import 'server-only'

import wait from '@/utilitaires/wait'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { canUserViewProgram, canUserDeleteEvent, filterViewablePrograms, userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'

const SORT_MAP = {
  date_signalement: 'reportedAt',
  date_creation: 'createdAt',
  id: 'id'
}

const getSortField = (value) => {
  if (!value) {
    return 'createdAt'
  } else {
    return SORT_MAP[value]
  }
}

const getOrderByClause = (tri, direction) => {
  const sortField = getSortField(tri)
  const sortDirection = direction ?? 'desc'

  const sortClause = ['id', 'createdAt'].includes(sortField) ? sortDirection : { sort: sortDirection, nulls: 'last' }
  const orderByClause = { [sortField]: sortClause }

  return orderByClause
}

const getWhereClauseFromParams = (params, user) => {
  const { statut, programme, tri, direction, region, texte: texteRaw } = params

  const { permissions } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined
  const isTextNumber = isNaN(texte) ? false : true

  const programsIds = programme ? programme : viewableProgramIds

  const whereClause = {
    statusId: statut ? { in: statut } : undefined,
    programId: { in: programsIds },
    location: {
      locality: {
        regionId: region ? { in: region } : undefined
      }
    },
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

  return whereClause
}

const getEventsCount = async (params) => {
  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)

  const count = await orm.Event.count({
    where: whereClause
  })

  return count
}

const toEventsDTO = (events) => {
  const transformed = events.map(e => {
    const { id, silabId, mapaqId, reportedAt, type, program, submitter, location } = e

    const { name: typeName } = type
    const { name: programName } = program

    const submitterName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ')

    const locality = location?.locality
    const localityName = locality?.name

    return {
      id,
      silabId,
      mapaqId,
      reportedAt,
      typeName,
      programName,
      submitterName,
      localityName
    }
  })

  return transformed
}

const getEvents = async (params) => {
  const { tri, direction, offset = 0, take = 25 } = params

  const user = await getUser()

  if (!user) {
    return []
  }

  const whereClause = getWhereClauseFromParams(params, user)
  const orderByClause = getOrderByClause(tri, direction)

  const events = await orm.Event.findMany({
    where: whereClause,
    include: {
      type: true,
      program: true,
      submitter: true,
      location: {
        include: {
          locality: true
        }
      }
    },
    orderBy: orderByClause,
    skip: (offset * take),
    take
  })

  return toEventsDTO(events)
}

const getEvent = async (id) => {
  const user = await getUser()

  if (!id) {
    return null
  }

  if (!user) {
    return null
  }

  try {
    const event = await orm.Event.findUnique({
      where: {
        id
      },
      include: {
        type: true,
        program: true,
        reportOrigin: true,
        status: true,
        habitatType: true,
        labShippingMethod: true,
        lab: true,
        location: true,
        specimens: {
          include: {
            specie: true,
            age: true,
            sex: true,
            discoveryState: true,
            deathCause: true,
            preservationMethod: true,
            measures: {
              include: {
                type: true,
                unit: true
              }
            }
          }
        }
      }
    })
  
    if (!event) {
      return null
    }
  
    const { programId } = event
  
    if (!canUserViewProgram(user, programId)) {
      return null
    }

    const canUserViewSpecimensSection = userCanViewSpecimenSection(user, programId)
    const canUserViewAnalysisSection = userCanViewAnalysisSection(user, programId)

    const { specimens, ...restEvent } = event

    const transformed = {
      ...restEvent,
      specimens: canUserViewSpecimensSection ? specimens : []
    }

    return transformed

  } catch (e) {
    // console.warn(e)
    return null
  }
}

const deleteEvent = async (id) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const canDeleteEvent = canUserDeleteEvent(user)

  if (!canDeleteEvent) {
    throw new Error()
  }

  await orm.event.delete({
    where: {
      id
    }
  })
  // await wait(1000)

  return null
}

export {
  getEvent, getEvents, getEventsCount,
  deleteEvent
}

