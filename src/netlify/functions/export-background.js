const handler = async (req, context) => {
  console.debug('Export', req, context)
  return Response.json({ status: 'ok' })
}

export default handler

export const config = {
  path: '/api/data/export'
}