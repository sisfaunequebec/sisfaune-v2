import prisma from '../database'

const getPrograms = async () => {
  const programs = await prisma.LutEventProgram.findMany()
  return programs

}

export default getPrograms
