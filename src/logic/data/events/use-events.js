'use client'

import useSWR from 'swr'

import fetcher from '../fetcher'

import {
  createSerializer
} from 'nuqs'

import { searchParams, urlKeys } from './events-params'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/data/events'

const useEvents = (params) => {
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
