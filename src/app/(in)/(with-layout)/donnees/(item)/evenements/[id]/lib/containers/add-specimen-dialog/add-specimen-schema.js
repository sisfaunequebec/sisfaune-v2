import * as v from 'valibot'

const addEventSchema = v.object({
  specie: v.object({ id: v.integer() }, 'L\'espèce doit être précisée'),
  discoveryStateId: v.nullish(v.pipe(v.number(), v.integer())),
  silabIdentificationNumber: v.nullish(v.string()),
  terrainIdentificationNumber: v.nullish(v.string()),
  huntingPermitNumber: v.nullish(v.string())
})

export default addEventSchema
