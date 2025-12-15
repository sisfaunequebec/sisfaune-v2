import * as v from 'valibot'

const schema = v.object({
  username: v.nonNullish(v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Le nom d\'utilisateur est requis')
  ), 'Le nom d\'utilisateur est requis')
})

export default schema
