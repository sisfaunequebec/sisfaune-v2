// const loader = createLoader(searchParams, { urlKeys })

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  // const params = loader(searchParams)
  // const events = await getEvents(params)

  return Response.json({ test: 'test '})
}

export {
  GET
}
