import getMeasureTypes from '@/lib/data/lookups/get-measure-types'

const GET = async (request) => {
  const result = await getMeasureTypes()
  return Response.json(result)
}

export {
  GET
}
