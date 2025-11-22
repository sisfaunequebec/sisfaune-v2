import getEventStatuses from '@/lib/data/lookups/get-event-statuses' 

const GET = async (request) => {
  const result = await getEventStatuses()
  return Response.json(result)
}

export {
  GET
}
