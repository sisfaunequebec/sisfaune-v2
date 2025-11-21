'use server'
import { cache } from 'react'

import prisma from '../database'

const getEventTypes = cache(async () => {
  const raw = await prisma.LutEventType.findMany()
  const types = raw.map(t => {
    const { id, name } = t
    return {
      id,
      name
    }
  })
  return types
})

export default getEventTypes
