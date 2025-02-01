import { searchParams, urlKeys } from '@/logic/data/events/events-params'

import {
  createLoader
} from 'nuqs/server'

import { getSpecimens } from '@/logic/data/specimens/service'

const loader = createLoader(searchParams, { urlKeys })

const GET  = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const specimens = await getSpecimens(params)
  
  return Response.json(specimens)
}

export {
  GET
}