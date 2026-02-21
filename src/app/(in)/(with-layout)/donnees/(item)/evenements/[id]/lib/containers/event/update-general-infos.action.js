'use server'

import { revalidatePath } from 'next/cache'

import { updateGeneralInfos } from '@/lib/data/events/service'

const updateGeneralInfosAction = async (eventId, data) => {
  const result = await updateGeneralInfos(eventId, data)

  revalidatePath(`donnees/evenements/${eventId}`)
  return result
}

export default updateGeneralInfosAction
