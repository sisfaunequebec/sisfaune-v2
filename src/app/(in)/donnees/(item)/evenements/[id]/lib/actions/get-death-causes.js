'use server'
import orm from '@/logic/data/database'
import orderBy from 'lodash.orderby'

const getDeathCauses = async () => {
  const raw = await orm.LutAnimalDeathCause.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      displayOrder: 'asc'
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
