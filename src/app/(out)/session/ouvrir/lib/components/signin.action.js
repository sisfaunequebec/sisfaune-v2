'use server'

import createEtlSessionCookie from '../create-etl-session-cookie'
import getUser from '@/lib/auth/get-user'

import { signIn } from '@/lib/auth'

const signAction = async (formData) => {
  try {
    await signIn('credentials', { ...formData, redirect: false })

    await createEtlSessionCookie()

    return { data: null, errors: null }
  } catch (error) {
    const { errors } = error
    return { data: null, errors }
  }
}

export default signAction


