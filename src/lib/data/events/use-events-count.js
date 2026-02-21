'use client'

import useSWR from 'swr'

import {
  createSerializer
} from 'nuqs'

import fetcher from '../fetcher'
import { searchParams, urlKeys } from './get-events.params'

import useUser from '@/lib/auth/use-user-v2'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/data/events/count'

const useEventsCount = (params) => {
  const { user } = useUser()
  const { id: userId } = user || {}

  const result = useSWR(
    () => ((userId) ? `${baseUrl}${serialize(params)}` : null),
    fetcher
  )

  const { data = {}, error, isLoading } = result
  const { total } = data
 
  return {
    data: total,
    isLoading,
    isError: error
  }
}

export default useEventsCount
