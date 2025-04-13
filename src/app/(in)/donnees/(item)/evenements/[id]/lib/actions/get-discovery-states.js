'use server'
import orm from '@/lib/data/database'

const getDiscoveryStates = async () => {
  const raw = await orm.LutDiscoveryState.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getDiscoveryStates
