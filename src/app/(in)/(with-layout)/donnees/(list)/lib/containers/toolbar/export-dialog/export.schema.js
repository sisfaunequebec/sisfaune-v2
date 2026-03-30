// import { z } from 'zod'
import * as v from 'valibot'

// const schema = z.object({
  // format: z.string()
  // typeId: z.number({ message: 'Le type doit être précisé' }),
  // statusId: z.number({ message: 'Le statut doit être précisé' }),
  // programId: z.number({ message: 'Le programme doit être précisé' }),
  // silabId: z.string().nullable(),
  // reportOriginId: z.number({ message: 'La provenance doit être précisée' }),
  // reportedAt: z.date({ message: 'La date du signalement est requise' })
// })

const schema = v.pipe(
  v.object({
    analysisGroupIds: v.nullish(v.array(v.any()))
  })
)

export default schema
