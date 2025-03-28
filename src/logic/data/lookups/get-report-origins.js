'use server'
import prisma from '../database'

const getReportOrigins = async () => {
  const raw = await prisma.LutReportOrigin.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getReportOrigins
