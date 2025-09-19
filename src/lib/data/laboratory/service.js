'use server'
import 'server-only'

// import { DateTime } from 'luxon'
import orm from '../database'

import getUser from '@/lib/auth/get-user'

const updateLaboratory = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  const updated = await orm.event.update({
    where: {
      id: eventId,
    },
    data: data
  })

  return null
}



export {
  updateLaboratory
}

