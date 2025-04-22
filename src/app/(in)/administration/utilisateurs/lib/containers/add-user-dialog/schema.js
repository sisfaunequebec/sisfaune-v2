import { z } from 'zod'

const schema = z.object({
  fullName: z.string({ message: 'Le nom doit être précisé' }),
  email: z.string({ message: 'Une Adresse de courriel valide doit être précisée' }).email({ message: 'Une Adresse de courriel valide doit être précisée' })

})

export default schema
