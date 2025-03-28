'use server'
import prisma from '../database'

const getEventTypes = async () => {
  const raw = await orm.LutEventType.findMany()
  const types = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return types
}

export default getEventTypes
