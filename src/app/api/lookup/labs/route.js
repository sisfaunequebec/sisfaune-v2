import getLabs from '@/lib/data/lookups/get-labs'

const GET = async (request) => {
  const result = await getLabs()
  return Response.json(result)
}

export {
  GET
}
