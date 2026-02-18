'use client'

import useSWR from 'swr'

import fetcher from '../data/fetcher'

const fetchOptions = {
  shouldRetryOnError: false,
  revalidateOnFocus: true,
  revalidateOnReconnect: true
}

const useUser = () => {
  const { data = {}, error, isLoading } = useSWR(
    '/api/auth/user',
    fetcher,
    fetchOptions
  )
  
  const { user } = data
 
  return {
    user,
    isLoading,
    isError: error
  }
}

export default useUser
