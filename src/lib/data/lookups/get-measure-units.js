'use server'
// import orderBy from 'lodash.orderby'
import prisma from '../database'

const getMeasureUnits = async () => {
  const units = await prisma.LutMeasureUnit.findMany()
  return units
}


export default getMeasureUnits
