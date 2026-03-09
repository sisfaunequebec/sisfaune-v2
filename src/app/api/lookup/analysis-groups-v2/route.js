import getAnalysisGroups from '@/lib/data/lookups/get-analysis-groups'

const GET = async (request) => {
  const groups = await getAnalysisGroups()
  const active  = groups.filter(g => g.isActive)
  // console.debug(groups.length, active.length)
  return Response.json(active)
}

export {
  GET
}
