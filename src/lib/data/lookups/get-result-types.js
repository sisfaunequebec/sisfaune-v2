'use server'
import prisma from '../database'

const getResultTypes = async () => {
  const types = await prisma.LutResultType.findMany()
  return types
}

export default getResultTypes
