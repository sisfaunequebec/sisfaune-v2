'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Flex } from '@chakra-ui/react'

import LoginForm from './lib/components/login-form'

const Login = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  console.debug(session, status)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/donnees/evenements')
    }
  }, [status, session, router])

  if (status === 'loading' || status === 'authenticated') {
    return null
  }

  return (
    <Flex direction='column' height='100vh' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Flex>
  )
}

export default Login
