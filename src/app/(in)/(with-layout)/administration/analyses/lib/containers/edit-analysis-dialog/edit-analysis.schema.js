import * as v from 'valibot'

const schema = v.object({
  name: v.pipe(v.string('Le nom de l\'analyse est requise'), v.trim()),
  code: v.nullish(v.pipe(v.string(), v.trim())),
  isActive: v.boolean('Une valeur est requise')
})

export default schema