import { searchParams, urlKeys } from '@/lib/data/users/users-params'

import {
  createLoader
} from 'nuqs/server'

import { getUsers } from '@/lib/data/users/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const users = await getUsers(params)

  return Response.json(users)
}

export {
  GET
}
