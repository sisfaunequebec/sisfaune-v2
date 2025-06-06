import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/lib/data/users/service'

const useUser = (userId) => {
  const result = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    initialData: {}
  })

  const { data } = result
  const { payload } = data

  return {
    user: payload
  }
}

export default useUser
