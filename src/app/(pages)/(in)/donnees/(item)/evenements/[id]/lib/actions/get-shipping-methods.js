'use server'
import orderBy from 'lodash.orderby'
import orm from '@/logic/data/database'

const getShippingMethods = async () => {
  const typesRaw = await orm.LutLabShippingMethod.findMany()
  const types = typesRaw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return orderBy(types, 'value')
}

export default getShippingMethods
