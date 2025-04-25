import { searchParams, urlKeys } from '@/lib/data/events/events-params'

import {
  createLoader
} from 'nuqs/server'

import { getEventsCount } from '@/lib/data/events/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const count = await getEventsCount(params)

  return Response.json({ total: count })
}

export {
  GET
}
