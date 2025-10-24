import * as v from 'valibot'

const schema = v.object({
  labResponsible: v.nullish(v.object({ id: v.string() }, 'Une valeur est requise')),
  labReceivedAt: v.nullish(v.pipe(v.string(), v.isoDate('Une date valide est requise'))),
  labReceivedBy: v.nullish(v.object({ id: v.string() }, 'Une valeur est requise')),
})

export default schema