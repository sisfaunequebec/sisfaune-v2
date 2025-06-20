'use server'

import { addEvent } from '@/lib/data/events/service'

const addEventAction = async (data) => {
  await addEvent(data)
}

export default addEventAction
