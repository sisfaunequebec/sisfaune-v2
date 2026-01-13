'use server'
import 'server-only'

import bcrypt from 'bcrypt'
import slugify from 'slugify'

import { Resend } from 'resend'

import orm from '../database'

import generatePassword from './generate-password'
import isProduction from '@/utils/is-production'

import getAuthUser from '@/lib/auth/get-user'

import WelcomeEmail from '@/lib/email/welcome'
import ChangePasswordEmail  from '@/lib/email/password-change'

const { RESEND_API_KEY } = process.env

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

const getWhereClauseFromParams = (params) => {
  const { statut, programme, tri, direction, region, texte: texteRaw } = params

  const texte = texteRaw?.trim().length ? texteRaw?.trim() : undefined

  const whereClause = {
    isActive: getActiveValue(statut),
    OR: texte ? [
      { username: { contains: texte, mode: 'insensitive' } },
      { email: { contains: texte, mode: 'insensitive' } },
      { organisation: { contains: texte, mode: 'insensitive' } },
    ] : undefined
  }

  return whereClause
}

const getActiveValue = (statut) => {
  if (!statut) {
    return undefined
  }
  return statut?.length === 2 ? undefined : ( statut?.includes(0) ? false : true )
}

// const getUsersCount = async (params) => {
//   console.debug('getUsersCount', params)
//   const user = await getAuthUser()

//   if (!user) {
//     return []
//   } else {
//     const { isAdmin } = user
//     if (!isAdmin) {
//       return []
//     }
//   }

//   const whereClause = getWhereClauseFromParams(params)

//   const total = await orm.User.count({
//     where: whereClause
//   })

//   return { data: { total } }
// }

const getUsers = async (params) => {
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

  const users = await orm.User.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: (offset * take),
    take
  })

  const count = await orm.User.count({
    where: whereClause
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

  return {
    payload,
    meta: {
      total: count
    }
  }
}

const getUser = async (id) => {
  const user = await orm.User.findUnique({
    where: {
      id
    },
    include: {
      permissions: true
    }
  })
  return { payload: user }
}

const sendWelcomeEmail = async ({ email, firstName, username, password }) => {
  const resend = new Resend(RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_NAME,
    to: [email],
    subject: 'SIS Faune - Votre inscription',
    react: WelcomeEmail({ firstName, username, password })
  })
}

// const addUser = async (payload) => {
//   const { hash, password, ...rest } = payload
//   try {
//     const inserted = await orm.user.create({
//       data: {
//         ...rest,
//         password: hash
//       }
//     })
//     return { data, errors: null }
//   } catch (e) {
//     const { code } = e
//     if (code === 'P2002') {
//       return { data: null, errors: { email: 'Cette adresse de courriel est déjà utilisée par un autre utilisateur. Veuillez vérifier ou contacter l\'administrateur à admin@sisfaunequebec.ca' }}
//     }
//     return { data: null, errors: { server: e.message } }
//   }
// }

const buildCreateUserPayload = async (data) => {
  const { firstName, lastName, email, password } = data

  const username = slugify([firstName, lastName].join('-'), { lower: true })
  const hash = bcrypt.hashSync(password, 10)

  const payload = {
    username,
    firstName,
    lastName,
    email,
    password,
    hash
  }

  return payload
}

const createUser = async (data) => {
  const payload = await buildCreateUserPayload(data)
  const { hash, ...rest } = payload

  try {
    await orm.user.create({
      data: {
        ...rest,
        password: hash
      }
    })

    const {  email, firstName, username, password } = rest
    await sendWelcomeEmail({ email, firstName, username, password })

    return { data: payload, errors: null }
  } catch (e) {
    const { code } = e
    if (code === 'P2002') {
      return { data: null, errors: { email: 'Cette adresse de courriel est déjà utilisée par un autre utilisateur.' }}
    }
    return { data: null, errors: { server: e.message } }
  }
}

const sendResetPasswordEmail = async ({ email, username, password }) => {
  const resend = new Resend(RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_NAME,
    to: [email],
    subject: 'SIS Faune - Votre nouveau mot de passe',
    react: ChangePasswordEmail({ username, password })
  })
  return { data, error }
}

const resetUserPassword = async (data) => {
  // console.debug(username, email)
  const newPassword = generatePassword()

  const hash = bcrypt.hashSync(newPassword, 10)
  try {
    const updatedUser = await orm.User.update({
      where: data,
      data: {
        password: hash
      }
    })

    const { username, email} = updatedUser
    await sendResetPasswordEmail({ email, username, password: newPassword })

    return { data: { newPassword, email }, errors: null }
  } catch (e) {
    const { code } = e
    if (code === 'P2025') {
      const { username } = data
      const isUsernameReset = !!username
      const key = isUsernameReset ? 'username' : 'email'
      return { data: null, errors: { [key]: 'Cet utilisateur n\'existe pas dans notre base de données. Veuillez vérifier ou contacter l\'administrateur à admin@sisfaunequebec.ca' }}
    }
    return { data: null, errors: { server: e.message } }
  }
}

const updateUser = async (user) => {
  const test = Math.random()

  if (test <= 0.4) {
    const { id: userId, firstName } = user
    const updatedUser = await orm.User.update({
      where: {
        id: userId
      },
      data: {
        firstName
      }
    })

    return { payload: updatedUser }
  } else {
    const error = new Error()
    throw error
  }
}

export {
  getUsers,
  getUser,
  buildCreateUserPayload,
  updateUser,
  createUser,
  resetUserPassword
}
