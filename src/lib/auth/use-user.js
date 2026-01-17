import { useCallback, useState, useEffect, useRef } from 'react'

import getUser from '@/lib/auth/get-user'

const useUser = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true)
      const user = await getUser()
      setUser(user)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  return { user, isLoading }
}

export default useUser