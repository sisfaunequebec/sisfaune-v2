import getLabs from '@/lib/data/lookups/get-labs'
import getCollaborators from '@/lib/data/lookups/get-collaborators'

const GET = async (request) => {
  const result = await getCollaborators({ activeOnly: false })
  return Response.json(result)
}

export {
  GET
}
