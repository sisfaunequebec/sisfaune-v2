import { z } from 'zod'

const firstLoginSchema = z.object({
  username: z.string({ message: 'Le nom d\'utilisateur est requis' }).trim().min(1, { message: 'Le nom d\'utilisateur est requis' }),
  email: z.string({ message: 'Une adresse de courriel valide doit être précisée' }).email({ message: 'Une adresse de courriel valide doit être précisée' })
})

export default firstLoginSchema
