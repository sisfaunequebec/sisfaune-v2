import getEventTypes from '@/lib/data/lookups/get-event-types'

const GET = async (request) => {
  const result = await getEventTypes()
  return Response.json(result)
}

export {
  GET
}
