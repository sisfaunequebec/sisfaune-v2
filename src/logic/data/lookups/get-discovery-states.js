'use server'
import prisma from '../database'

const getDiscoveryStates = async () => {
  const raw = await prisma.LutDiscoveryState.findMany()
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
