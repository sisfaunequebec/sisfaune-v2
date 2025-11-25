'use server'

import { revalidatePath } from 'next/cache'

import { addSpecimenToEvent } from '@/lib/data/events/service'

const addSpecimenAction = async (eventId, data) => {
  await addSpecimenToEvent(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default addSpecimenAction
