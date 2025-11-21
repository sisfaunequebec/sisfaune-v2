'use server'
import orderBy from 'lodash.orderby'
import prisma from '../database'

const getShippingMethods = async () => {
  const typesRaw = await prisma.LutLabShippingMethod.findMany()
  // const types = typesRaw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
  return orderBy(typesRaw, 'name')
}

export default getShippingMethods
