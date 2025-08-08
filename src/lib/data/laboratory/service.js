'use server'
import 'server-only'

import { DateTime } from 'luxon'
import orm from '../database'

import getUser from '@/lib/auth/get-user'

// import { canUserViewProgram, canUserDeleteEvent, canUserSubmitInProgram, filterViewablePrograms, userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'

const updateLaboratory = async (eventId, data) => {
  const user = await getUser()

  if (!user) {
    throw new Error()
  }

  console.debug(data)

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

