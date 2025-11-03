'use server'
import prisma from '../database'

const getDeathCauses = async () => {
  const raw = await prisma.LutAnimalDeathCause.findMany({
    where: {
      isActive: true
    }
  })
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getDeathCauses
