import { z } from 'zod'

const existingGroupSchema = z.object({
  isNewGroup: z.literal(0),
  analysisName: z.string({ message: 'Le nom doit être précisé' }),
  resultTypeId: z.coerce.number().min(1, { message: 'Le type doit être précisé' }),
  analysisGroupId: z.coerce.number().min(1, { message: 'Le groupe doit être précisé' })
})

const newGroupSchema = z.object({
  isNewGroup: z.literal(1),
  analysisName: z.string({ message: 'Le nom doit être précisé' }),
  resultTypeId: z.coerce.number().min(1, { message: 'Le type doit être précisé' }),
  newAnalysisGroupName: z.string().optional(),
  analysisSectorId: z.coerce.number().min(1, { message: 'Le secteur doit être précisé' })
})

const schema = z.discriminatedUnion('isNewGroup', [
  existingGroupSchema,
  newGroupSchema
])

// const schema = z.union([existingGroupSchema, newGroupSchema])

export default schema
