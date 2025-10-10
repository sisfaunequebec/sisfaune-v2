'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getHabitatTypes = async () => {
  const typesRaw = await prisma.LutHabitatType.findMany()
  const types = typesRaw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return orderBy(types, 'label')
}

export default getHabitatTypes
