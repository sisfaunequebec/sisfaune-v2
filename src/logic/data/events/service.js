import orderBy from 'lodash.orderby'

import { DateTime } from 'luxon'

import orm from '../database'

const SORT_MAP = {
  'date_signalement': 'reportedAt',
  'date_creation': 'createdAt',
  'id': 'id'
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

  const sortClause = ['id', 'createdAt'].includes(sortField) ? sortDirection : { sort:  sortDirection, nulls: 'last' }
  const orderByClause  = { [sortField]: sortClause }
  
  return orderByClause
}

const getEvents = async (params, context) => {
  const { statut, programme, tri, direction, region, offset = 0, take = 25 } = params

  const whereClause = {
    statusId: statut ? { in: statut } : undefined,
    programId: programme ? { in: programme } : undefined,
    location: {
      locality: {
        regionId: region ? { in: region } : undefined,
      }
    }
  }

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

  const payload = events.map(e => {
    const { id, silabId, mapaqId, reportedAt, type, program, submitter, location } = e

    const { name: typeName } = type
    const { name: programName } = program
    const { name: submitterName } = submitter
    const { locality } = location

    const localityName = locality?.name

    // const reportingDate = reportedAt ? DateTime.fromISO(reportedAt).toFormat('yyyy-LL-dd') : null

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

  return payload
}

export {
  getEvents
}