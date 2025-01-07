'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/auth'

import fromErrorToFormState from '@/utilities/from-error-to-form-state'

const signAction = async (formData) => {
  try {
    await signIn('credentials', { ...formData, redirect: false })
  } catch (error) {
    return fromErrorToFormState(error)
  }
  redirect('/donnees/evenements')
}

export default signAction