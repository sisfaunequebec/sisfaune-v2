import { searchParams, urlKeys } from '@/lib/data/lookups/get-analysis-groups.params'

import {
  createLoader
} from 'nuqs/server'

import orderBy from 'lodash.orderby'
import getAnalysisGroups from '@/lib/data/lookups/get-analysis-groups'

const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const params = loader(searchParams)
  const { texte } = params

  const result = await getAnalysisGroups(texte)

  const transformed = result.map(r => {
    const { id, name, analysisSector } = r
    const { name: sectorName } = analysisSector 
    return {
      id,
      name,
      sectorName
    }
  })

  return Response.json(orderBy(transformed, ['id']))
}

export {
  GET
}
