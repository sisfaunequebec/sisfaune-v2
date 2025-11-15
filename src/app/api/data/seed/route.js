const orm = require('@/lib/data/database')
const doSeed = require('@/lib/data/seed/do-seed')

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  await doSeed(orm)
  return Response.json({ status: 'ok' })
}

export {
  GET
}
