'use server'
import prisma from '../database'

const getEuthanasiaOrganisations = async () => {
  const items = await prisma.LutEuthanasiaOrganisation.findMany()
  // const items = raw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
  return items
}

export default getEuthanasiaOrganisations
