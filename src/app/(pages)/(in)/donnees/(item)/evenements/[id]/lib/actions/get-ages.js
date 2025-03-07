'use server'
import orm from '@/logic/data/database'

const getAges = async (group) => {
  const raw = await orm.LutAnimalAge.findMany({
    where: {
      group,
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

export default getAges
