'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/lib/auth'

const signAction = async (formData) => {
  try {
    await signIn('credentials', { ...formData, redirect: false })
  } catch (error) {
    const { errors } = error
    return { errors }
  }
  redirect('/donnees/evenements')
}

export default signAction


