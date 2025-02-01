import orderBy from 'lodash.orderby'

import { DateTime } from 'luxon'

import orm from '../database'

const getOrderByClause = (tri, direction) => {
  const sortDirection = direction ?? 'desc'

  switch (tri) {
    case 'id':
      return [{ 'eventId': sortDirection }, {'sequenceId': sortDirection }]
    case 'date_signalement':
      return { event: {
        'reportedAt': { sort: sortDirection, nulls: 'last' }
        }
      }
    default:
      return { event: {
        'createdAt': sortDirection
        }
      }
  }
}

const getSpecimens = async (params, context) => {
  const { statut, programme, tri, direction, region, offset = 0, take = 25 } = params

  const whereClause = {
    event: {
      statusId: statut ? { in: statut } : undefined,
      programId: programme ? { in: programme } : undefined,
      location: {
        locality: {
          regionId: region ? { in: region } : undefined,
        }
      }
    }
  }

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

    const { name: submitterName } = submitter
    const { locality } = location

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
  getSpecimens
}