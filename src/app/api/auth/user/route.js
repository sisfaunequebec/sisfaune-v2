import getUser from '@/lib/auth/get-user'

const GET = async () => {
  const user = await getUser()
  return Response.json({ user })
}

export {
  GET
}
