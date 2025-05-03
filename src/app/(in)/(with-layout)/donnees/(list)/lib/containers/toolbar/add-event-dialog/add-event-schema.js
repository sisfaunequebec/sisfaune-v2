import { z } from 'zod'

const addEventSchema = z.object({
  typeId: z.number({ message: 'Le type doit être précisé' }),
  statusId: z.number({ message: 'Le statut doit être précisé' }),
  programId: z.number({ message: 'Le programme doit être précisé' }),
  silabId: z.string().nullable(),
  reportOriginId: z.number({ message: 'La provenance doit être précisée' }),
  reportedAt: z.date({ message: 'La date du signalement est requise' })
})

export default addEventSchema
