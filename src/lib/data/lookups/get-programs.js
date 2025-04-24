'use server'
import prisma from '../database'

const getAllPrograms = async () => {
  const raw = await prisma.LutEventProgram.findMany()
  const programs = raw.map(t => {
    const { id: value, name: label, isActive } = t
    return {
      value,
      label,
      isActive
    }
  })
  return programs
}

const getActivePrograms = async () => {
  const programs = await getAllPrograms()
  return programs.filter(p => p.isActive)
}

const getActiveProgramsForUser = async (user) => {
  const programs = await getActivePrograms()
  const { permissions}
  return programs.filter(p => p.isActive)
}

export default getActivePrograms

export {
  getAllPrograms
} 
