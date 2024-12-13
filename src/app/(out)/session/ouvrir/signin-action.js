'use server'

import { redirect } from 'next/navigation'

import { signIn } from '@/auth'

import wait from '@/utilities/wait'
import fromErrorToFormState from '@/utilities/from-error-to-form-state'

const signAction = async (formData) => {
  // console.debug(formState, formData)
  try {
    await signIn('credentials', { redirect: false })
  } catch (error) {
    return fromErrorToFormState(error)
  }
  await wait(500)
  redirect('/donnees/evenements')
}

export default signAction