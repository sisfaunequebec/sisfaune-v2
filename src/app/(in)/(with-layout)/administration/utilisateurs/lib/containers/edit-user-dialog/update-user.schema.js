import * as v from 'valibot'

const schema = v.pipe(
  v.looseObject({ // allow other fields
    firstName: v.pipe(v.string('Le prénom doit être précisé'), v.trim()),
    lastName: v.pipe(v.string('Le nom de famille doit être précisé'), v.trim()),
    email: v.pipe(v.string('L\'adresse de courriel est requise'), v.trim(), v.email('Une adresse de courriel valide est requise')),
  })
)

export default schema
