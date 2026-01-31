import { searchParams, urlKeys } from '@/lib/data/lookups/get-lab-responsibles.params'

import {
  createLoader
} from 'nuqs/server'

// import getUser from '@/lib/auth/get-user'
import getLabResponsibles from '@/lib/data/lookups/get-lab-responsibles'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { texte } = params
  
  const result = await getLabResponsibles(texte)

  return Response.json(result)
}

export {
  GET
}
