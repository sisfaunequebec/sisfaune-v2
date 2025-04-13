'use server'
import orm from '@/lib/data/database'

const getPrograms = async () => {
  const raw = await orm.LutEventProgram.findMany()
  const items = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return items
}

export default getPrograms
