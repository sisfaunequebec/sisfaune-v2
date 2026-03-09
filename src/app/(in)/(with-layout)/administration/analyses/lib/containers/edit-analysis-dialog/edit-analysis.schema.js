import * as v from 'valibot'

const schema = v.object({
  name: v.pipe(v.string('Le nom de l\'analyse est requise'), v.trim()),
  code: v.nullish(v.pipe(v.string(), v.trim())),
  isActive: v.boolean('Une valeur est requise'),
  unit: v.nullish(v.pipe(v.string(), v.trim())),
  lowerLimit: v.nullish(v.number('La borne inférieure doit être un nombre')),
  upperLimit: v.nullish(v.number('La borne supérieure doit être un nombre')),
})

export default schema