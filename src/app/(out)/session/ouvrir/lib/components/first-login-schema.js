import * as v from 'valibot'

const schema = v.object({
  email: v.nonNullish(v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('L\'adresse de courriel est requise'),
    v.email('Une adresse de courriel valide est requise')
  ), 'L\'adresse de courriel est requise')
})

export default schema