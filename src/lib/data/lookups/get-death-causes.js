'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getDeathCauses = async () => {
  const items = await prisma.LutAnimalDeathCause.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      { displayOrder: 'asc' },
      { name: 'asc' }
    ]
  })
  // const items = raw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
  return items
}

export default getDeathCauses
