import { redirect } from 'next/navigation'
import { auth } from '@/auth'

import { Flex } from '@chakra-ui/react'

import LoginForm from './components/login-form'

const OuvrirSession = async () => {
  const session = await auth()

  if (session) {
    return redirect('/donnees/evenements')
  }

  return (
    <Flex direction='column' height='100vh' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Flex>
  )
}

export default OuvrirSession
