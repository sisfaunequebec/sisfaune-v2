'use server'
import prisma from '../database'

const getPrograms = async () => {
  const raw = await prisma.LutEventProgram.findMany()
  const programs = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return programs
}

export default getPrograms
