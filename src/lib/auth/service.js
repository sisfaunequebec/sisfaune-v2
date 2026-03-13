'use server'
import 'server-only'

import bcrypt from 'bcrypt'

import { Resend } from 'resend'

import orm from '../data/database'
import generatePassword from '../data/users/generate-password'

import ChangePasswordEmail  from '@/lib/email/password-change'

const { RESEND_API_KEY } = process.env

const sendChangePasswordEmail = async ({ email, username, password }) => {
  const resend = new Resend(RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_NAME,
    to: [email],
    subject: 'SIS Faune - Votre nouveau mot de passe',
    react: ChangePasswordEmail({ username, password })
  })
}

const updateAccount = async (userId, data) => {
  const { email, password } = data
  const hash = password ? bcrypt.hashSync(password, 10) : undefined

  try {
    const updatedUser = await orm.User.update({
      where: {
        id: userId
      },
      data: { email, password: hash }
    })

    const { username } = updatedUser
    await sendChangePasswordEmail({ email, username, password })
    
    return { data, errors: null }
  } catch (e) {
    const { code } = e
    if (code === 'P2002') {
      return { data: null, e, errors: { email: 'Cette adresse de courriel est déjà utilisée par un autre utilisateur. Veuillez vérifier ou contacter l\'administrateur à admin@sisfaunequebec.ca' }}
    }
    return { data: null, errors: { server: e.message } }
  }
}

const validateEmail = async (userId, data) => {
  const { email } = data

  const password = generatePassword()
  const hash = bcrypt.hashSync(password, 10)

  try {
    const updatedUser = await orm.User.update({
      where: {
        id: userId
      },
      data: { email, password: hash }
    })

    const { username } = updatedUser
    await sendChangePasswordEmail({ email, username, password })
    
    return { data, errors: null }
  } catch (e) {
    const { code } = e
    if (code === 'P2002') {
      return { data: null, e, errors: { email: 'Cette adresse de courriel est déjà utilisée par un autre utilisateur. Veuillez vérifier ou contacter l\'administrateur à admin@sisfaunequebec.ca' }}
    }
    return { data: null, errors: { server: e.message } }
  }
}

export {
  updateAccount,
  validateEmail
}
