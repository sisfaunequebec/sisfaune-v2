// import { z } from 'zod'
import * as v from 'valibot'

// const addEventSchema = z.object({
//   typeId: z.number({ message: 'Le type doit être précisé' }),
//   statusId: z.number({ message: 'Le statut doit être précisé' }),
//   programId: z.number({ message: 'Le programme doit être précisé' }),
//   silabId: z.string().nullable(),
//   reportOriginId: z.number({ message: 'La provenance doit être précisée' }),
//   reportedAt: z.pipe(z.string(), z.date({ message: 'La date du signalement est requise' })
// })

const addEventSchema = v.object({
  typeId: v.pipe(v.number('Le type doit être précisé'), v.integer()),
  statusId: v.pipe(v.number('Le statut doit être précisé'), v.integer()), //z.number({ message: 'Le statut doit être précisé' }),
  programId: v.pipe(v.number('Le programme doit être précisé'), v.integer()), // z.number({ message: 'Le programme doit être précisé' }),
  silabId: v.nullish(v.string()), // z.string().nullable(),
  reportOriginId: v.pipe(v.number('La provenance doit être précisée'), v.integer()),
  reportedAt: v.pipe(v.string('La date du signalement est requise'), v.isoDate())
})


export default addEventSchema
