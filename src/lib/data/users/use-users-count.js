'use client'

import useSWR from 'swr'

import fetcher from '../fetcher'

import {
  createSerializer
} from 'nuqs'

import { searchParams, urlKeys } from './users-params'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/admin/users/count'

const useUsersCount = (params) => {
  const { data = {}, error, isLoading } = useSWR(`${baseUrl}${serialize(params)}`, fetcher)
  const { total } = data
 
  return {
    data: total,
    isLoading,
    isError: error
  }
}

export default useUsersCount
