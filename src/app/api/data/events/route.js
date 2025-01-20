import { searchParams, urlKeys } from '@/logic/data/events/events-params'

import {
  createLoader
} from 'nuqs/server'

import { getEvents } from '@/logic/data/events/service'

const loader = createLoader(searchParams, { urlKeys })

const GET  = async (request) => {
  const { nextUrl: { searchParams } } = request
  const params = loader(searchParams)
  const events = await getEvents(params)
  return Response.json({ meta: searchParams, data: events })
}

export {
  GET
}