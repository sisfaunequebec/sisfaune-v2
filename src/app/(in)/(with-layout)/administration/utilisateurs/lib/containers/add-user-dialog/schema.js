import { z } from 'zod'

const schema = z.object({
  firstName: z.string({ message: 'Le prénom doit être précisé' }),
  lastName: z.string({ message: 'Le nom de famille doit être précisé' }),
  email: z.string({ message: 'Une adresse de courriel valide doit être précisée' }).email({ message: 'Une adresse de courriel valide doit être précisée' }),
  password: z.string({})
})

export default schema
