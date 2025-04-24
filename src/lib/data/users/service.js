import orderBy from 'lodash.orderby'

import { DateTime } from 'luxon'

import orm from '../database'

const SORT_MAP = {
  'nom_utilisateur': 'username',
  courriel: 'email',
  organisation: 'organisation'
}

const getSortField = (value) => {
  if (!value) {
    return 'username'
  } else {
    return SORT_MAP[value]
  }
}

const getOrderByClause = (tri, direction) => {
  const sortField = getSortField(tri)
  const sortDirection = direction ?? 'asc'

  const sortClause = ['organisation'].includes(sortField) ? { sort: sortDirection, nulls: 'last' } : sortDirection
  const orderByClause = { [sortField]: sortClause }

  return orderByClause
}

const getActiveValue = (statut) => {
  if (!statut) {
    return undefined
  }
  return statut?.length === 2 ? undefined : ( statut?.includes(0) ? false : true )
}

const getUsers = async (params, context) => {
  const { statut, texte: texteRaw, tri, direction, offset = 0, take = 25 } = params

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined

  const whereClause = {
    isActive: getActiveValue(statut),
    OR: texte ? [
      { username: { contains: texte, mode: 'insensitive' } },
      { email: { contains: texte, mode: 'insensitive' } },
      { organisation: { contains: texte, mode: 'insensitive' } },
    ] : undefined
  }

  const orderByClause = getOrderByClause(tri, direction)

  const users = await orm.User.findMany({
    where: whereClause,
    include: {
      // type: true
    },
    orderBy: orderByClause,
    skip: (offset * take),
    take
  })

  const payload = users.map(u => {
    const { id, username, firstName, lastName, email, organisation, isActive } = u
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    return {
      id,
      username,
      fullName: fullName.trim().length ? fullName : null,
      email,
      organisation,
      isActive
    }
  })

  return payload
}

const getUser = async (id, context) => {
  const event = await orm.User.find({
    where: {
      id
    }
  })
  return event
}

export {
  getUsers,
  getUser
}
