const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  return Response.json({ status: 'ok' })
}

export {
  GET
}

export const config = {
  type: "experimental-scheduled",
  schedule: "* * * * *"
}