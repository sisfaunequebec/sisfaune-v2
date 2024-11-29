import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email({ message: 'Une adresse de courriel valide est requise' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis' })
})

export default signInSchema
