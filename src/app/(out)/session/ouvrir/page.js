import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import { Flex } from '@chakra-ui/react'

import LoginForm from './lib/components/login-form'

const OuvrirSession = async () => {
  const session = await auth()

  if (session) {
    // return redirect('/donnees/evenements')
  }

  return (
    <Flex direction='column' height='100vh' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Flex>
  )
}

export default OuvrirSession
