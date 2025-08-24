import { z } from 'zod'

const addEventSchema = z.object({
  specieId: z.coerce.number({ message: 'L\'espèce doit être précisée' }).min(1, { message: 'L\'espèce doit être précisée' }),
  discoveryStateId: z.number({ message: 'L\'état être précisé' }),
  silabIdentificationNumber: z.string().nullable(),
  terrainIdentificationNumber: z.string().nullable(),
  huntingPermitNumber: z.string().nullable()
})

export default addEventSchema
