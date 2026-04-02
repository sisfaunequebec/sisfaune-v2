'use client'

import useSWR from 'swr'

import fetcher from '../fetcher'

import useUser from '@/lib/auth/use-user-v2'

const baseUrl = '/api/admin/tasks'

const useTasks = () => {
  const { user } = useUser()
  const { id: userId } = user || {}

  const result = useSWR(
    () => ((userId) ? `${baseUrl}` : null),
    fetcher,
    { refreshInterval: 5000 }
  )
 
  const { data, error, isLoading } = result
  
  return {
    data,
    isLoading,
    isError: error
  }
}

export default useTasks
