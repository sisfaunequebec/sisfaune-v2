'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getAnimalAges = async ({ activeOnly = true } = {}) => {
  const ages = await prisma.LutAnimalAge.findMany({
    where: activeOnly ? { isActive: true } : undefined
  })
  return orderBy(ages, 'id')
}


export default getAnimalAges
