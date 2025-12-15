'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/lib/auth'

const signAction = async (formData) => {
  try {
    const result  = await signIn('credentials', { ...formData, redirect: false })
    return { data: null, errors: null }
  } catch (error) {
    const { errors } = error
    return { data: null, errors }
  }

  redirect('/donnees/evenements')
}

export default signAction


