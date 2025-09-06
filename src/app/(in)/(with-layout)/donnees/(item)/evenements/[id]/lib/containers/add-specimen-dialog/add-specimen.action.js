'use server'

import { revalidatePath } from 'next/cache'

import { addSpecimenToEvent } from '@/lib/data/events/service'

const addSpecimenAction = async (eventId, data) => {
  const { specie, ...rest } = data
  const specieId = specie?.id ?? null
  await addSpecimenToEvent(eventId, {
    ...rest,
    specieId
  })
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default addSpecimenAction
