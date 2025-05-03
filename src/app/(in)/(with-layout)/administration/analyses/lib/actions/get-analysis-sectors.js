'use server'
import orm from '@/lib/data/database'
// import orderBy from 'lodash.orderby'

const getAnalysisSectors = async () => {
  const raw = await orm.LutAnalysisSector.findMany({
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

export default getAnalysisSectors
