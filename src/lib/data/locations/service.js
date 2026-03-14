'use server'
import 'server-only'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import toDbLocationTransformer from '../transformers/to-db/location'

const updateLocation = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const transformed = toDbLocationTransformer(data, { user })
  
  await orm.Location.update({
    where: {
      eventId
    },
    data: transformed
  })

  return null
}

export {
  updateLocation
}
