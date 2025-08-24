'use server'
import prisma from '../database'

const getLabResponsibles = async (filter) => {
  const raw = await prisma.User.findMany({
    where: {
      isPathologist: true,
      OR: filter ? [
        { firstName: filter ? { contains: filter, mode: 'insensitive' } : undefined },
        { lastName: filter ? { contains: filter, mode: 'insensitive' } : undefined }
      ] : undefined
    },
    orderBy: {
      lastName: 'asc'
    }
  })

  const result = raw.map(u => {
    const { id, firstName, lastName, organisation } = u
    return {
      id, firstName, lastName, organisation
    }
  })

  return result
}

export default getLabResponsibles
