'use server'

import { revalidatePath } from 'next/cache'

import { updateLaboratory } from '@/lib/data/laboratory/service'

const updateLaboratoryAction = async (eventId, data) => {
  await updateLaboratory(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default updateLaboratoryAction
