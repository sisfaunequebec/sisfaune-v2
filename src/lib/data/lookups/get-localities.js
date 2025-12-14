'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getLocalities = async (filter) => {
  const raw = await prisma.LutLocality.findMany({
    where: {
      name: { contains: filter, mode: 'insensitive' } ?? undefined
    },
    take: 10
  })
  return orderBy(raw, 'name')
}


export default getLocalities
