'use server'

import { revalidatePath } from 'next/cache'

import { addSpecimen } from '@/lib/data/specimens/service'

const addSpecimenAction = async (eventId, data) => {
  const result = await addSpecimen(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
  return result
}

export default addSpecimenAction
