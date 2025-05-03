import { searchParams, urlKeys } from '@/lib/data/events/events-params'

import {
  createLoader
} from 'nuqs/server'

import getUser from '@/lib/auth/get-user'
import { getSpecimens } from '@/lib/data/specimens/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const specimens = await getSpecimens(params)

  return Response.json(specimens)
}

export {
  GET
}
