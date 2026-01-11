import * as v from 'valibot'

const schema = v.pipe(
  v.object({
    email: v.pipe(v.string('Cette information est requise'), v.email('Une adresse de courriel valide est requise')),
    password: v.nullish(v.pipe(v.string('Cette information est requise'), v.minLength(8, 'Le mot de passe doit avoir au moins 8 caractères'))),
  })
)

export default schema
