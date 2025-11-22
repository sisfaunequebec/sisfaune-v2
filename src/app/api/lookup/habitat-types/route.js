import gethabitatTypes from '@/lib/data/lookups/get-habitat-types'

const GET = async (request) => {
  const result = await gethabitatTypes()
  return Response.json(result)
}

export {
  GET
}
