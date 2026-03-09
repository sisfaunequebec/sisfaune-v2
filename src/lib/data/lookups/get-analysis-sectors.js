'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getAnalysisSectors = async () => {
  const sectors = await prisma.LutAnalysisSector.findMany()
  return orderBy(sectors, 'name')
}

export default getAnalysisSectors
