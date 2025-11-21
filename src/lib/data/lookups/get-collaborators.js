'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getCollaborators = async (activeOnly = false) => {
  const whereClause = activeOnly ? { isActive: true } : undefined
  const raw = await prisma.Collaborator.findMany({
    where: whereClause
  })
  // const result = raw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
  return orderBy(raw, 'name')
}


export default getCollaborators
