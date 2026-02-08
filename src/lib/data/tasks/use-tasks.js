'use client'

import useSWR from 'swr'

import fetcher from '../fetcher'

const baseUrl = '/api/admin/tasks'

const useTasks = () => {
  const { data = {}, error, isLoading } = useSWR(`${baseUrl}`, fetcher, { refreshInterval: 5000 })
 
  return {
    data,
    isLoading,
    isError: error
  }
}

export default useTasks
