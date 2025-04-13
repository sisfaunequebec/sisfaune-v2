'use server'
import orm from '@/lib/data/database'

const getAnalysisGroups = async () => {
  const raw = await orm.LutAnalysisGroup.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
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

export default getAnalysisGroups
