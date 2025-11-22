'use server'
import prisma from '../database'

const getEventTypes = async () => {
  console.debug('getEventTypes')
  const raw = await prisma.LutEventType.findMany()
  const types = raw.map(t => {
    const { id, name } = t
    return {
      id,
      name
    }
  })
  return types
}

export default getEventTypes
