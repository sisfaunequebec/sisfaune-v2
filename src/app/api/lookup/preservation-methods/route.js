import getPreservationMethods from '@/lib/data/lookups/get-preservation-methods'

const GET = async (request) => {
  const result = await getPreservationMethods()
  return Response.json(result)
}

export {
  GET
}
