'use server'
import orm from '@/logic/data/database'

const getEvent = async (id, context) => {
  const event = await orm.Event.findUnique({
    where: {
      id
    },
    include: {
      location: true,
      specimens: {
        include: {
          specie: true
        }
      },
      labEvents: true
    }
  })
  return event
}

export default getEvent
