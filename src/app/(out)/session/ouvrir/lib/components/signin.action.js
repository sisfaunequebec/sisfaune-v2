'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/lib/auth'

const signAction = async (formData) => {
  try {
    const result  = await signIn('credentials', { ...formData, redirect: false })
    console.debug('signAction', result)
  } catch (error) {
    const { errors } = error
    return { errors }
  }

  redirect('/donnees/evenements')
}

export default signAction


