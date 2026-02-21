'use client'

import useSWRInfinite from 'swr/infinite'

import {
  createSerializer
} from 'nuqs'

import fetcher from '../fetcher'

import { searchParams, urlKeys } from './specimens-params'

import useUser from '@/lib/auth/use-user-v2'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/data/specimens'

const useSpecimens = (params, take = 20) => {
  const { user } = useUser()
  const { id: userId } = user || {}

  const result = useSWRInfinite(
    // The getKey function receives the page index and the previous page data. We can use these to construct the URL for the next page of data.
    // If the previous page data is empty, we return null to indicate that there are no more pages to fetch.
    // We also check if the userId is available before constructing the URL.
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      if (!userId) return null

      const mergedParams = {
        ...params,
        offset: pageIndex,
        take
      }

      return { url: `${baseUrl}${serialize(mergedParams)}`, mergedParams, userId }
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

export default useSpecimens
