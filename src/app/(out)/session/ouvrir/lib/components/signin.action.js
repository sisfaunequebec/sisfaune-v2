'use server'

import { signIn } from '@/lib/auth'

const signAction = async (formData) => {
  try {
    await signIn('credentials', { ...formData, redirect: false })
    return { data: null, errors: null }
  } catch (error) {
    const { errors } = error
    return { data: null, errors }
  }
}

export default signAction


