import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import {
  createLoader
} from 'nuqs/server'

import getUser from '@/lib/auth/get-user'
import { getEvents } from '@/lib/data/events/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const events = await getEvents(params)

  return Response.json(events)
}

export {
  GET
}
