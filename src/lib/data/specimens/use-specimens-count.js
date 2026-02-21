'use client'

import useSWR from 'swr'

import {
  createSerializer
} from 'nuqs'

import fetcher from '../fetcher'
import { searchParams, urlKeys } from './specimens-params'

import useUser from '@/lib/auth/use-user-v2'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/data/specimens/count'

const useSpecimensCount = (params) => {
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

export default useSpecimensCount
