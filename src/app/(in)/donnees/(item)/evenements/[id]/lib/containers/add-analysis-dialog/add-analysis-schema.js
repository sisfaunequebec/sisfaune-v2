import { z } from 'zod'

const addAnalysisSchema = z.object({
  analysisId: z.coerce.number().min(1, { message: 'Le type d\'analyse doit être précisée' })
})

export default addAnalysisSchema

