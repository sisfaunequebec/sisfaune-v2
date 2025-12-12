'use server'

import { revalidatePath } from 'next/cache'

import { updateLocation } from '@/lib/data/locations/service'

const updateLocationAction = async (eventId, data) => {
  await updateLocation(eventId, data)
  console.debug(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default updateLocationAction
