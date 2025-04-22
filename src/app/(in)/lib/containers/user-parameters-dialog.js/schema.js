import { z } from 'zod'

const addAnalysisSchema = z.object({
  email: z.string({ message: 'Une Adresse de courriel valide doit être précisée' }).email({ message: 'Une Adresse de courriel valide doit être précisée' }),
  password: z.string({ message: 'Le mot de passe doit être précisé' }),
  newPassword: z.string({ message: 'Le nouveau mot de passe doit être précisé' }).min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
  confirmation: z.string({ message: 'Le mot de passe doit être confirmé' })
})

export default addAnalysisSchema
