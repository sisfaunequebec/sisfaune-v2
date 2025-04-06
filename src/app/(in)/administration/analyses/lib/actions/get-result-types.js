'use server'
import orm from '@/logic/data/database'

const getResultTypes = async () => {
  const raw = await orm.LutResultType.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getResultTypes
