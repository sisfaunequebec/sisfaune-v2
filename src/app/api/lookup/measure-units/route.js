import getMeasureUnits from '@/lib/data/lookups/get-measure-units'

const GET = async (request) => {
  const result = await getMeasureUnits()
  return Response.json(result)
}

export {
  GET
}
