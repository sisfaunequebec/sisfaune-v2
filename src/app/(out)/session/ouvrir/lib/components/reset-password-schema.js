import { z } from 'zod'

const resetPasswordSchema = z.object({
  username: z.string({ message: 'Le nom d\'utilisateur est requis' }).trim().min(1, { message: 'Le nom d\'utilisateur est requis' }),
})

export default resetPasswordSchema
