'use server'
import 'server-only'

import bcrypt from 'bcrypt'
import slugify from 'slugify'

import orm from '../data/database'

// import isProduction from '@/utils/is-production'

const updateAccount = async (userId, data) => {
  const { email, password } = data
  const hash = password ? bcrypt.hashSync(password, 10) : undefined
  try {
    const updated = await orm.User.update({
      where: {
        id: userId
      },
      data: { email, password: hash }
    })
    return { data, errors: null }
  } catch (e) {
    const { code } = e
    if (code === 'P2002') {
      return { data: null, errors: { email: 'Cette adresse de courriel est déjà utilisée par un autre utilisateur. Veuillez vérifier ou contacter l\'administrateur à admin@sisfaunequebec.ca' }}
    }
    return { data: null, errors: { server: e.message } }
  }
}

export {
  updateAccount
}
