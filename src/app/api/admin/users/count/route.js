import { searchParams, urlKeys } from '@/lib/data/users/users-params'

import {
  createLoader
} from 'nuqs/server'

import getUser from '@/lib/auth/get-user'
import { getUsersCount } from '@/lib/data/users/service'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const user = await getUser()

  const params = loader(searchParams)
  const count = await getUsersCount(params, { user })

  return Response.json({ total: count })
}

export {
  GET
}
