import { searchParams, urlKeys } from '@/lib/data/lookups/get-submitters.params'

import {
  createLoader
} from 'nuqs/server'

import getSubmitters from '@/lib/data/lookups/get-submitters'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { texte } = params

  const result = await getSubmitters(texte)
  return Response.json(result)
}

export {
  GET
}
