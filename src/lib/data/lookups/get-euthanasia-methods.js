'use server'
import prisma from '../database'

const getEuthanasiaMethods = async () => {
  const raw = await prisma.LutEuthanasiaMethod.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
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

export default getEuthanasiaMethods
