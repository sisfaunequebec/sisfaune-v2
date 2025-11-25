// import getDiscoveryStates from '@/lib/data/lookups/get-discovery-states'
import getDeathCauses from '@/lib/data/lookups/get-death-causes'

const GET = async (request) => {
  const result = await getDeathCauses()
  return Response.json(result)
}

export {
  GET
}
