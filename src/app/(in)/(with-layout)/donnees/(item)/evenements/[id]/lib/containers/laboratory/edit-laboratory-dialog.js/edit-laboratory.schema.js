import * as v from 'valibot'

const schema = v.object({
  labResponsible: v.nullish(v.object({ id: v.string() }, 'Une valeur est requise')),
  labReceivedBy: v.nullish(v.date('Une date valide est requise')),
  labReceivedAt: v.nullish(v.date('Une date valide est requise'))
})

export default schema