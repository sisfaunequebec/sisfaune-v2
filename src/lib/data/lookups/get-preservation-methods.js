'use server'
import prisma from '../database'

const getPreservationMethods = async () => {
  const raw = await prisma.LutPreservationMethod.findMany({
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
