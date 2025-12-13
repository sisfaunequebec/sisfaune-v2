import * as v from 'valibot'

const schema = v.object({
  type: v.nullish(v.object({ id: v.string() }, 'Une valeur est requise')),
  description: v.nullish(v.string()),
  coordinates: v.object({ latitude: v.number(), longitude: v.number() }, 'Une valeur est requise')
})

export default schema