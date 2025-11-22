import getReportOrigins from '@/lib/data/lookups/get-report-origins'

const GET = async (request) => {
  const result = await getReportOrigins({ activeOnly: true })
  return Response.json(result)
}

export {
  GET
}
