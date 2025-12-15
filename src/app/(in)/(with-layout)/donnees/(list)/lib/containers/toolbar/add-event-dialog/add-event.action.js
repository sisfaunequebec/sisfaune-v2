'use server'

import { addEvent } from '@/lib/data/events/service'

const addEventAction = async (data) => {
  const result = await addEvent(data)
  return result
}

export default addEventAction
