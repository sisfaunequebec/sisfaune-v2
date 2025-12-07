import getAnimalAges from '@/lib/data/lookups/get-animal-ages'

const GET = async (request) => {
  const result = await getAnimalAges()
  return Response.json(result)
}

export {
  GET
}
