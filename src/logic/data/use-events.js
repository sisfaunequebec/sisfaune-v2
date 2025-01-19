'use client'

import useSWR from 'swr'

import fetcher from './fetcher'

import {
  createSerializer,
  parseAsInteger,
  parseAsArrayOf,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs'

const searchParams = {
  // texte: parseAsString.withDefault(''),
  statut: parseAsArrayOf(parseAsInteger),
  // programme: parseAsArrayOf(parseAsInteger),
  // region: parseAsArrayOf(parseAsInteger),
}

const serialize = createSerializer(searchParams)
const baseUrl = '/api/data/events'

const useEvents = (params) => {
  console.debug('params', serialize(params))
  const result = useSWR({ url: `${baseUrl}${serialize(params)}`, params }, ({ url }) => fetcher(url))
  const { data, error, isLoading } = result
  const payload = data ? data.data : []
  return {
    payload,
    isLoading,
    isError: error
  }
}

export default useEvents
