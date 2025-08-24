import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import {
  createLoader
} from 'nuqs/server'

import getUser from '@/lib/auth/get-user'
import { getSpecimensCount } from '@/lib/data/specimens/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const user = await getUser()

  const params = loader(searchParams)
  const count = await getSpecimensCount(params, { user })

  return Response.json({ total: count })
}

export {
  GET
}
