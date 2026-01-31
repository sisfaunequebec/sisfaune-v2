'use server'
import prisma from '../database'

const getEventStatuses = async () => {
  const statuses = await prisma.LutEventStatus.findMany()
  return statuses
}

export default getEventStatuses
