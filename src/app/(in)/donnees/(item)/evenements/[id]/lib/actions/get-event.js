'use server'
import 'server-only'

import orm from '@/lib/data/database'

import { canUserViewProgram } from '@/lib/auth/acl'

const getEvent = async (id, context) => {
  const { user } = context

  if (!user) {
    return
  }

  const event = await orm.Event.findUnique({
    where: {
      id
    },
    include: {
      type: true,
      program: true,
      reportOrigin: true,
      status: true,
      habitatType: true,
      labShippingMethod: true,
      lab: true,
      location: true,
      specimens: {
        include: {
          specie: true,
          age: true,
          sex: true,
          discoveryState: true,
          deathCause: true,
          preservationMethod: true,
          measures: {
            include: {
              type: true,
              unit: true
            }
          }
        }
      },
      labEvents: true
    }
  })

  const { programId } = event

  if (!canUserViewProgram(user, programId)) {
    return null
  }

  return event
}

export default getEvent
