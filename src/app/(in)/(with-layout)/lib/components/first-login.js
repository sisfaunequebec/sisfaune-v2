'use client'
import useUser from '@/lib/auth/use-user-v2'

import FirstLoginDialog from '../containers/first-login-dialog.js'

const FirstLogin = () => {
  const { user, isLoading } = useUser()
  const { isFirstLogin } = user ?? {}

  return isLoading ? null : ( isFirstLogin ? <FirstLoginDialog account={user} /> : null ) 
}

export default FirstLogin