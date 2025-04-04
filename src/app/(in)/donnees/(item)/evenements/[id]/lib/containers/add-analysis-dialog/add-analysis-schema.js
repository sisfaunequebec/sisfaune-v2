import { z } from 'zod'

const schema = z.object({
  // analysisId: z.coerce.number().min(1, { message: 'Le type d\'analyse doit être précisée' })
})

export default schema

