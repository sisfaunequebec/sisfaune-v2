'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getCollaborators = async ({ activeOnly = true }) => {
  const raw = await prisma.Collaborator.findMany({
    where: activeOnly ? { isActive: true } : undefined
  })
  return orderBy(raw, 'name')
}


export default getCollaborators
