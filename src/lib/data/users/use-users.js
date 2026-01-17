'use client'

// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import fetcher from '../fetcher'

import {
  createSerializer
} from 'nuqs'

import { searchParams, urlKeys } from './users-params'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/admin/users'

const useUsers = (params, take = 20) => {
  const result = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      const mergedParams = {
        ...params,
        offset: pageIndex,
        take
      }

      return { url: `${baseUrl}${serialize(mergedParams)}`, mergedParams }
    },
    ({ url }) => fetcher(url),
    { keepPreviousData: true, initialSize: 1, revalidateAll: true }
  )

  const { data, error, isLoading, isValidating, mutate, size, setSize } = result

  return {
    data,
    isLoading,
    isError: error,
    size,
    setSize
  }
}

export default useUsers
