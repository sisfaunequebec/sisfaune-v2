import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'

import { Flex, Container } from '@chakra-ui/react'

import Toolbar from './components/toolbar'

export const metadata = {
  title: 'SIS Faune :: Gestion des événements '
}

const Layout = async ({ children }) => {
  const session = await auth()

  if (!session) {
    return redirect('/session/ouvrir')
  }
  return (
    <Flex as={'main'} minH={'100vh'} flex={1} direction={'column'} justifyContent={'flex-start'} px={0} alignItems={'flex-start'}>
      <Toolbar session={session} />
      {children}
    </Flex>
  )
}

export default Layout


