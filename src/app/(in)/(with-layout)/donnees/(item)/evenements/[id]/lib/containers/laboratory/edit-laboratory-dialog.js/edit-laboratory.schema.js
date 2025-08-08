import * as v from 'valibot'

const schema = v.object({
  labReceivedAt: v.nullish(v.date('Une date valide est requise'))
})

export default schema