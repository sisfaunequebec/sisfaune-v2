'use server'
import prisma from '../database'

const getEuthanasiaMethods = async () => {
  const items = await prisma.LutEuthanasiaMethod.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  return items
}

export default getEuthanasiaMethods
