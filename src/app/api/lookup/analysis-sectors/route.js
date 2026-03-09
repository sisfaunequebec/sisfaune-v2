import getAnalysisSectors from '@/lib/data/lookups/get-analysis-sectors'

const GET = async (request) => {
  const result = await getAnalysisSectors()
  return Response.json(result)
}

export {
  GET
}
