'use server'
import orm from '@/logic/data/database'

const getStatuses = async () => {
  const raw = await orm.LutEventStatus.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getStatuses
