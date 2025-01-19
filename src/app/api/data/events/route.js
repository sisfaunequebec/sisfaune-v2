
import wait from '@/utilitaires/wait'

import {
  createLoader,
  parseAsInteger,
  parseAsArrayOf,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server'

const searchParams = {
  // texte: parseAsString.withDefault(''),
  statut: parseAsArrayOf(parseAsInteger),
  // programme: parseAsArrayOf(parseAsInteger),
  // region: parseAsArrayOf(parseAsInteger),
}

const loadSearchParams = createLoader(searchParams)

const events = Array(50).fill(null).map((item, i) => {
  return {
    id: i + 1
  }
})

export async function GET(request) {
  await wait(Math.random() * 1000)
  const { nextUrl: { searchParams } } = request
  const params = loadSearchParams(searchParams)
  // console.debug('searchParams', params)
  const { statut } = params
  const filtered = statut ? events.filter(e => statut.includes(e.id)) : events
  return Response.json({ meta: searchParams, data: filtered })
}