'use server'
import 'server-only'

import orm from '../database'

import getUser from '@/lib/auth/get-user'

import laboratoryTransformer from '../transformers/to-db/laboratory'

const updateLaboratory = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const transformed = laboratoryTransformer(data, { user })

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

