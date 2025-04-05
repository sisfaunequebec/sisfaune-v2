import { z } from 'zod'

const schema = z.object({
  fullName: z.string({ message: 'Le nom doit être précisé' }),
  email: z.string({ message: 'Une adresse courriel valide doit être précisée' }).email({ message: 'Une adresse courriel valide doit être précisée' }),

})

export default schema

