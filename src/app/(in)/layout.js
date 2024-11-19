import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'

import { Flex, Container } from '@chakra-ui/react'

import Toolbar from './components/toolbar'

export const metadata = {
  title: 'SIS Faune :: Gestion des événements '
}

// const signOutAction = async () => {
//   'use server'
//   await signOut()
// }

// const SignOut = async () => {
//   const session = await auth()
//   if (!session) {
//     return null
//   }
//   return (
//     <form action={signOutAction}>
//       <Button type={'submit'}>Fermer</Button>
//     </form>
//   )
// }

const Layout = async ({ children }) => {
  const session = await auth()
  if (!session) {
    return redirect('/session/ouvrir')
  }
  return (
    <>
      <Flex as={'header'} flex={0} direction={'column'} justifyContent={'flex-start'} px={0} py={4} bg={'white'} borderBottomWidth={2} minH={24}>
        <Container maxWidth={'full'}>
          <Toolbar session={session} />
        </Container>    
      </Flex>
      <Flex as={'main'} flex={1} direction={'column'} justifyContent={'space-between'} px={0} py={4}>
        {/* <Container maxWidth={'4xl'}>{children}</Container> */}
        {children}
      </Flex>
      {/* <Flex as={'footer'} flex={0} direction={'column'} justifyContent={'space-between'} px={0} py={4} pb={6}>
        <Container maxWidth={'4xl'}>Footer</Container>
      </Flex> */}
    </>
  )
}

export default Layout


