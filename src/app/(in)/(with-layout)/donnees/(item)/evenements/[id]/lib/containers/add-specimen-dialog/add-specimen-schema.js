import * as v from 'valibot'

const schema = v.object({
  specie: v.object({ id: v.integer() }, 'L\'espèce doit être précisée'),
  discoveryState: v.object({ id: v.integer() }, 'L\'état doit être précisée'),
  silabIdentificationNumber: v.nullish(v.string()),
  terrainIdentificationNumber: v.nullish(v.string()),
  huntingPermitNumber: v.nullish(v.string())
})

export default schema
