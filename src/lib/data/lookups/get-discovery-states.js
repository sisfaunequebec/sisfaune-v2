'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getDiscoveryStates = async () => {
  const items = await prisma.LutDiscoveryState.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  return items
}

export default getDiscoveryStates
