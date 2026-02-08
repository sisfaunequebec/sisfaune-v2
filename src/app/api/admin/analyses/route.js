import { searchParams, urlKeys } from '@/lib/data/analyses/analyses-params'

import {
  createLoader
} from 'nuqs/server'

import { getAnalyses } from '@/lib/data/analyses/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  console.debug(params)
  const analyses = await getAnalyses(params)

  return Response.json(analyses)
}

export {
  GET
}
