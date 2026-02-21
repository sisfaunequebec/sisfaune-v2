'use server'

import { revalidatePath } from 'next/cache'

import { updateLaboratory } from '@/lib/data/laboratories/service'

const updateLaboratoryAction = async (eventId, data) => {
  const result = await updateLaboratory(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
  return result
}

export default updateLaboratoryAction
