'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getAnimalSexes = async () => {
  const sexes = await prisma.LutAnimalSex.findMany()
  return orderBy(sexes, 'id')
}


export default getAnimalSexes
