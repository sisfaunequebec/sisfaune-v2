'use server'
import prisma from '../database'

import { matchSorter } from 'match-sorter'

const getAnimalSpecies = async (filter) => {
  const raw = await prisma.lutAnimalSpecie.findMany({
    where: {
      OR: filter ? [
        { name: filter ? { contains: filter, mode: 'insensitive' } : undefined },
        { binome: filter ? { contains: filter, mode: 'insensitive' } : undefined }
      ] : undefined
    },
    take: 100
  })

  const result = raw.map(u => {
    const { id, name, binome } = u
    return {
      id, name, binome
    }
  })

  const sorted = matchSorter(result, filter, { keys: ['name', 'binome'], threshold: matchSorter.rankings.MATCHES })

  return sorted.slice(0, 50)
}

export default getAnimalSpecies
