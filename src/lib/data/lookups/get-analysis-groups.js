'use server'
import prisma from '../database'

const getAnalysisGroups = async (filter) => {
  const groups = await prisma.LutAnalysisGroup.findMany({
    where: {
      AND: [
        { name: filter ? { contains: filter, mode: 'insensitive' } : undefined },
        { analyses: { some: { isActive: true }}}
      ]
    },
    select: {
      id: true,
      name: true,
      isActive: true,
      analysisSector: {
        select: {
          name: true
        }
      },
      analyses: {
        select: {
          name: true,
          isActive: true,
        }
      }
    },
    take: 10
  })
  return groups
}


export default getAnalysisGroups
