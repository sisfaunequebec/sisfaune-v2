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
      {/* <Flex as={'header'} flex={0} position={'sticky'} zIndex={10} direction={'column'} justifyContent={'flex-start'} top={0} >
        
      </Flex> */}
      <Flex as={'main'} flex={1} direction={'column'} justifyContent={'space-between'} px={0} alignItems={'flex-start'}>
        <Toolbar session={session} />
        {children}
      </Flex>
    </>
  )
}

export default Layout


