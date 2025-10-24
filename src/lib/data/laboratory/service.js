'use server'
import 'server-only'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import { eventTransformer } from '../transformers/event'

const updateLaboratory = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const transformed = eventTransformer(data, { user }, 'toDB')

  await orm.event.update({
    where: {
      id: eventId,
    },
    data: transformed
  })

  return null
}



export {
  updateLaboratory
}

