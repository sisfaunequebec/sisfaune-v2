'use server'
import orderBy from 'lodash.orderby'
import prisma from '@/lib/data/database'

const getLabs = async () => {
  const typesRaw = await prisma.LutLaboratory.findMany({
    where: {
      isActive: true
    }
  })
  // const types = typesRaw.map(t => {
  //   const { id: value, name: label } = t
  //   return {
  //     value,
  //     label
  //   }
  // })
return orderBy(typesRaw, 'name')
}

export default getLabs
