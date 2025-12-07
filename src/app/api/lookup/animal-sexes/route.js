import getAnimalSexes from '@/lib/data/lookups/get-animal-sexes'

const GET = async (request) => {
  const result = await getAnimalSexes()
  return Response.json(result)
}

export {
  GET
}
