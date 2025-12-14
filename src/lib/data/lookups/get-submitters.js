'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getSubmitters = async (filter) => {
  const raw = await prisma.User.findMany({
    where: {
      isActive: true,
      OR: filter ? [
        { firstName: filter ? { contains: filter, mode: 'insensitive' } : undefined },
        { lastName: filter ? { contains: filter, mode: 'insensitive' } : undefined }
      ] : undefined
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      organisation: true
    },
    take: 10
  })
  return orderBy(raw, 'name')
}


export default getSubmitters
