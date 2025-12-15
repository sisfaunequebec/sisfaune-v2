import * as v from 'valibot'

const schema = v.object({
  type: v.nonNullish(v.any(), 'Le type doit être précisé'),
  status: v.nonNullish(v.any(), 'Le statut doit être précisé'),
  program: v.nonNullish(v.any(), 'Le programme doit être précisé'),
  reportOrigin: v.nonNullish(v.any(), 'La provenance doit être précisée'),
  reportedAt: v.pipe(v.string('La date du signalement est requise'), v.isoDate()),
  silabId: v.nullish(v.string())
})


export default schema
