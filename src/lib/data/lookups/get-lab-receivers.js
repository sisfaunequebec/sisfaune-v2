'use server'
import prisma from '../database'

const getLabReceivers = async (filter) => {
  const raw = await prisma.Event.findMany({
    where: {
      OR: filter ? [
        { labReceivedBy: filter ? { contains: filter, mode: 'insensitive' } : undefined }
      ] : undefined,
      labReceivedBy: {
        not: null
      }
    },
    distinct: ['labReceivedBy'],
    orderBy: {
      labReceivedBy: 'asc'
    },
    select: {
      labReceivedBy: true
    }
  })

  const result = raw.map(u => {
    const { labReceivedBy } = u
    return {
      id: labReceivedBy,
      label: labReceivedBy
    }
  })

  return result
}

export default getLabReceivers


