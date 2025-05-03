'use server'
import orderBy from 'lodash.orderby'
import orm from '@/lib/data/database'

const getLabs = async () => {
  const typesRaw = await orm.LutLaboratory.findMany({
    where: {
      isActive: true
    }
  })
  const types = typesRaw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return orderBy(types, 'value')
}

export default getLabs
