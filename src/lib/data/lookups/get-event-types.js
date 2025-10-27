'use server'
import { cache } from 'react'

import prisma from '../database'

const getEventTypes = async () => {
  const raw = await prisma.LutEventType.findMany()
  const types = raw.map(t => {
    const { id: value, name: label } = t
    return {
      value,
      label
    }
  })
  return types
}

export default getEventTypes
