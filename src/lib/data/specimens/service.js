'use server'
import 'server-only'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { filterViewablePrograms } from '@/lib/auth/acl'

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

const getWhereClauseFromParams = (params, user) => {
  const { statut, programme, tri, direction, region, texte: texteRaw } = params

  const { permissions } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined
  const isTextNumber = isNaN(texte) ? false : true

  const programsIds = programme ? programme : viewableProgramIds

  const whereClause = {
    event: {
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
  }

  // const whereClause = {
  //   statusId: statut ? { in: statut } : undefined,
  //   programId: { in: programsIds },
  //   location: {
  //     locality: {
  //       regionId: region ? { in: region } : undefined
  //     }
  //   },
  //   OR: texte ? [
  //     { id: isTextNumber ? parseInt(texte, 10) : undefined },
  //     { silabId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
  //     { mapaqId: texte ? { contains: texte, mode: 'insensitive' } : undefined },
  //     { pathologyNumber: texte ? { contains: texte, mode: 'insensitive' } : undefined },
  //     { submitter: { lastName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
  //     { submitter: { firstName: texte ? { contains: texte, mode: 'insensitive' } : undefined } },
  //     { location: {
  //         locality: {
  //           name: texte ? { contains: texte, mode: 'insensitive' } : undefined
  //         }
  //       }
  //     }
  //   ] : undefined
  // }

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
    const { id, eventId, specimenNumber, cqsasNumber, specie, event } = s

    const { submitter, location, reportedAt } = event
    const { name: specieName, binome: specieBinome } = specie

    const submitterName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ')

    const locality = location?.locality
    const localityName = locality?.name

    return {
      id,
      eventId,
      specimenNumber,
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

export {
  getSpecimens,
  getSpecimensCount
}
