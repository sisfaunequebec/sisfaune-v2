import { searchParams, urlKeys } from '@/lib/data/lookups/get-animal-species.params'

import {
  createLoader
} from 'nuqs/server'

// import getUser from '@/lib/auth/get-user'
import getAnimalSpecies from '@/lib/data/lookups/get-animal-species'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { texte } = params
  // console.debug(params)
  const result = await getAnimalSpecies(texte)

  return Response.json(result)
}

export {
  GET
}
