import { z } from 'zod'

const schema = z.object({
  fullName: z.string({ message: 'Le nom doit être précisé' }),
  email: z.string({ message: 'Une adresse de courriel valide doit être précisée' }).email({ message: 'Une adresse de courriel valide doit être précisée' })

})

export default schema
