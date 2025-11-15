'use server'
import orm from '@/lib/data/database'

const getPreservationMethods = async (value) => {
  // console.debug('getPreservationMethods', value)
  const raw = await orm.LutPreservationMethod.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getPreservationMethods
