'use server'

import { redirect } from "next/navigation"

import { z } from 'zod'

import { signIn } from "@/auth"
// import { AuthError } from "next-auth"

import wait from '@/utilities/wait'
import fromErrorToFormState from '@/utilities/from-error-to-form-state'

const signInSchema = z.object({
  email: z.string().email({ message: 'Une adresse de courriel valide est requise' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis' })
})

const signAction = async (formState, formData) => {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })
    await signIn('credentials', { redirect: false })
  } catch (error) {
    return fromErrorToFormState(error)
  }
  await wait(500)
  redirect('/evenements')
}

export default signAction