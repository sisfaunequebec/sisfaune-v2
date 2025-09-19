import {
  createLoader
} from 'nuqs/server'

import getLabReceivers from '@/lib/data/lookups/get-lab-receivers'
import { searchParams, urlKeys } from '@/lib/data/lookups/get-lab-receivers.params'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { texte } = params
  const result = await getLabReceivers(texte)

  return Response.json(result)
}

export {
  GET
}
