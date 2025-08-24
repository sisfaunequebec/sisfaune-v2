'use server'

import { addSpecimenToEvent } from '@/lib/data/events/service'

const addSpecimenAction = async (eventId, data) => {
  const result = await addSpecimenToEvent(eventId, data)
  return result
}

export default addSpecimenAction
