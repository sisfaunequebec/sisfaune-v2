import wait from '@/utilitaires/wait'

import { searchParams, urlKeys } from '@/logic/data/events-params'

import {
  createLoader
} from 'nuqs/server'

const loader = createLoader(searchParams, { urlKeys })

const events = Array(50).fill(null).map((item, i) => {
  return {
    id: i + 1
  }
})

const GET  = async (request) => {
  await wait(Math.random() * 1000)
  const { nextUrl: { searchParams } } = request
  const params = loader(searchParams)
  // console.debug('searchParams', params)
  const { statut } = params
  const filtered = statut ? events.filter(e => statut.includes(e.id)) : events
  return Response.json({ meta: searchParams, data: filtered })
}

export {
  GET
}