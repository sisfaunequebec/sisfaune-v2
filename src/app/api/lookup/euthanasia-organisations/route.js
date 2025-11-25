import getEuthanasiaOrganisations from '@/lib/data/lookups/get-euthanasia-organisations'

const GET = async (request) => {
  const result = await getEuthanasiaOrganisations()
  return Response.json(result)
}

export {
  GET
}
