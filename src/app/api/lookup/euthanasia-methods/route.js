import getEuthanasiaMethods from '@/lib/data/lookups/get-euthanasia-methods'

const GET = async (request) => {
  const result = await getEuthanasiaMethods()
  return Response.json(result)
}

export {
  GET
}
