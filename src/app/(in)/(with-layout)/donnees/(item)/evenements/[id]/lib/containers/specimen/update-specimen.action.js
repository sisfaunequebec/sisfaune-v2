'use server'

import { revalidatePath } from 'next/cache'

import { updateSpecimen } from '@/lib/data/specimens/service'

const updateSpecimenAction = async (eventId, specimenId, data) => {
  const result = await updateSpecimen(specimenId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
  return result
}

export default updateSpecimenAction
