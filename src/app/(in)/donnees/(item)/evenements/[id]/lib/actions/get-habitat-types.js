'use server'
import orderBy from 'lodash.orderby'
import orm from '@/lib/data/database'

const getHabitatTypes = async (group) => {
  const typesRaw = await orm.LutHabitatType.findMany()
  const types = typesRaw.map(t => {
    const { id: value, group: label } = t
    return {
      value,
      label
    }
  })
  return orderBy(types, 'value')
}

export default getHabitatTypes
