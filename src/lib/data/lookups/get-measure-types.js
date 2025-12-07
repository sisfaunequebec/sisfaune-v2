'use server'
// import orderBy from 'lodash.orderby'
import prisma from '../database'

const getMeasureTypes = async () => {
  const types = await prisma.LutAnimalMeasureType.findMany()
  return types
}


export default getMeasureTypes
