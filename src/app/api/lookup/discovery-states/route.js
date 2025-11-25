import getDiscoveryStates from '@/lib/data/lookups/get-discovery-states'

const GET = async (request) => {
  const result = await getDiscoveryStates()
  return Response.json(result)
}

export {
  GET
}
