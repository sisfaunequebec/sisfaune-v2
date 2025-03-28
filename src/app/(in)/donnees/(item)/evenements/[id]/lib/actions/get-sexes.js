'use server'
import orm from '@/logic/data/database'

const getSexes = async (group) => {
  const raw = await orm.LutAnimalSex.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getSexes
