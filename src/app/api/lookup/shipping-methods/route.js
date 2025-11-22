import getShippingMethods from '@/lib/data/lookups/get-shipping-methods'

const GET = async (request) => {
  const result = await getShippingMethods()
  return Response.json(result)
}

export {
  GET
}
