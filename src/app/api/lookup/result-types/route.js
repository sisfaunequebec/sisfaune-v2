import getResultTypes from '@/lib/data/lookups/get-result-types' 

const GET = async (request) => {
  const result = await getResultTypes()
  return Response.json(result)
}

export {
  GET
}
