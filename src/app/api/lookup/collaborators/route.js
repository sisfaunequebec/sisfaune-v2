import { searchParams, urlKeys } from '@/lib/data/lookups/get-collaborators.params'

import {
  createLoader
} from 'nuqs/server'

import getCollaborators from '@/lib/data/lookups/get-collaborators'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { active } = params
  // console.debug('getCollaborators', searchParams, params, active)
  const result = await getCollaborators({ activeOnly: active })
  return Response.json(result)
}

export {
  GET
}
