'use server'
import prisma from '../database'

const getEventStatuses = async () => {
  console.debug('getEventStatuses')
  const raw = await prisma.LutEventStatus.findMany()
  // const items = raw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
  return raw
}

export default getEventStatuses
