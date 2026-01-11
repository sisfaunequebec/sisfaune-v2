import * as v from 'valibot'

const schema = v.pipe(
  v.object({
    email: v.pipe(v.string('Cette information est requise'), v.email('Une adresse de courriel valide est requise')),
  //   deathCause: v.object({ id: v.integer() }),
  //   euthanizedAt: v.nullish(v.isoDate()),
  //   euthanasiaOrganisation: v.nullish(v.object({ id: v.integer() })), 
  //   euthanasiaMethod: v.nullish(v.object({ id: v.integer() })), 
  //   productAmount: v.nullish(v.any()),
  //   bottleNumber: v.nullish(v.string()),
  //   terrainIdentificationNumber: v.nullish(v.string()),
  //   silabIdentificationNumber: v.nullish(v.string()),
  //   cqsasNumber: v.nullish(v.string()),
  //   sefaqNumber: v.nullish(v.string()),
  //   huntingPermitNumber: v.nullish(v.string()),
  //   identificationMarks: v.nullish(v.string()),
  //   notes: v.nullish(v.string()),
  //   keywords: v.nullish(v.string()),
  //   sex: v.nullish(v.object({ id: v.integer() })),
  //   age: v.nullish(v.object({ id: v.integer() })),
  //   measures: v.any(),
  //   preservationMethod: v.nullish(v.object({ id: v.integer() })), 
  }),
  // v.forward(
  //   v.custom((specimen) => {
  //     if (isLethalInjection(specimen) && !!specimen.bottleNumber) {
  //       return specimen.productAmount !== null
  //     }
  //     return true
  //   }, 'La quantité est requise'),
  //   ['productAmount']
  // ),
  // v.forward(
  //   v.custom((specimen) => {
  //     if (isLethalInjection(specimen) && !!specimen.productAmount) {
  //       return specimen.bottleNumber !== null
  //     }
  //     return true
  //   }, 'Le numéro de bouteille est requis'),
  //   ['bottleNumber']
  // ),
)

export default schema
