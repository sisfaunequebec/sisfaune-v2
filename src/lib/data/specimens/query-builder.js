import { DateTime } from 'luxon'

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

const DATE_MAP = {
  date_signalement: 'reportedAt',
  date_decouverte: 'discoveredAt',
  date_recolte: 'collectedAt'
}

const getPartialDateClause = (date, debut, fin) => {
  const fieldName = DATE_MAP[date] || 'reportedAt'

  const conditions = [
    debut ? { [fieldName]: { gte: DateTime.fromFormat(debut, 'yyyy-LL-dd').toJSDate() } } : null,
    fin ? { [fieldName]: { lte: DateTime.fromFormat(fin, 'yyyy-LL-dd').toJSDate() } } : null
  ]

  return {
    AND: conditions.filter(Boolean)
  }
}

const getWhereClauseFromParams = (params, user) => {
  const { statut, programme, region, groupe, texte: texteRaw, date, debut, fin } = params

  const { permissions } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined
  const isTextNumber = isNaN(texte) ? false : true

  const programsIds = programme ? programme : viewableProgramIds
  const groupIds = groupe ? groupe.map(i => parseInt(i, 10)) : undefined

  const partialDateClause = getPartialDateClause(date, debut, fin) 

  const whereClause = {
    specie: groupe ? { groupId: { in: groupIds } } : undefined, 
    event: {
      // id: { gt: 304000 },
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


export {
  getOrderByClause,
  // getPartialDateClause,
  getWhereClauseFromParams
}
