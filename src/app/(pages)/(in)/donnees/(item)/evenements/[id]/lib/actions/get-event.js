'use server'
import orm from '@/logic/data/database'

const getEvent = async (id, context) => {
  const event = await orm.Event.findUnique({
    where: {
      id
    },
    include: {
      type: true,
      location: true,
      specimens: {
        include: {
          specie: true,
          age: true,
          sex: true,
          discoveryState: true,
          deathCause: true,
          preservationMethod: true
        }
      },
      labEvents: true
    }
  })
  return event
}

export default getEvent
