'use client'

import useSWR from 'swr'

import fetcher from '../fetcher'

import {
  createSerializer
} from 'nuqs'

import { searchParams, urlKeys } from './specimens-params'

const serialize = createSerializer(searchParams, { urlKeys })
const baseUrl = '/api/data/specimens/count'

const useSpecimensCount = (params) => {
  const { data = {}, error, isLoading } = useSWR(`${baseUrl}${serialize(params)}`, fetcher)
  const { total } = data
 
  return {
    data: total,
    isLoading,
    isError: error
  }
}

export default useSpecimensCount
