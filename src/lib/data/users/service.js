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
import ResetPasswordEmail  from '@/lib/email/password-reset'

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

const buildCreateUserPayload = async(userToCreate) => {
  const { firstName, lastName, email, password } = userToCreate

  const username = slugify([firstName, lastName].join('-'), { lower: true })
  const hash = bcrypt.hashSync(password, 10)

  const data = {
    username,
    firstName,
    lastName,
    email,
    password,
    hash
  }

  return data
}

const sendWelcomeEmail = async ({ email, firstName, username, password }) => {
  if (isProduction()) {
    const resend = new Resend(RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: process.env.SENDING_NAME,
      to: [email],
      subject: 'SIS Faune - Votre inscription',
      react: WelcomeEmail({ firstName, username, password })
    })
  }
}

const insertUser = async (payload) => {
  const { hash, password, ...rest } = payload
  const inserted = await orm.user.create({
    data: {
      ...rest,
      password: hash
    }
  })
  return inserted
}

const createUser = async (userToCreate) => {
  const payload = await buildCreateUserPayload(userToCreate)
  const insertedUser = await insertUser(payload)
  const { email, firstName, username, password } = payload
 
  await sendWelcomeEmail({ email, firstName, username, password })
  return insertedUser
}

const sendResetPasswordEmail = async ({ email, username, password }) => {
  const resend = new Resend(RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_NAME,
    to: [email],
    subject: 'SIS Faune - Votre nouveau mot de passe',
    react: ResetPasswordEmail({ username, password })
  })
  return { data, error }
}

const resetUserPassword = async ({ username }) => {
  const newPassword = generatePassword()
  const hash = bcrypt.hashSync(newPassword, 10)
  try {
    const updatedUser = await orm.User.update({
      where: {
        username
      },
      data: {
        password: hash
      }
    })

    if (!updatedUser) {
      const error = new Error()
      throw error
    }

    if (!isProduction()) {
      console.debug('New password is : ', newPassword)
    } 

    const { email } = updatedUser
    const result = await sendResetPasswordEmail({ email, username, password: newPassword })
    console.debug('Sending result is : ', result)

    return newPassword
  } catch (e) {
    throw e
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
  // getUsersCount,
  getUser,
  buildCreateUserPayload,
  updateUser,
  createUser,
  resetUserPassword
}
