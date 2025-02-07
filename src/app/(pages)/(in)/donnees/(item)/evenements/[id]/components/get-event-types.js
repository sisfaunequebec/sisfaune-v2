'use server'
import orm from '@/logic/data/database'

const getEventTypes = async () => {
  const typesRaw = await orm.LutEventType.findMany()
  const types = typesRaw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  console.debug(types)
  return types
}

export default getEventTypes
