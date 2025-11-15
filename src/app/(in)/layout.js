import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import { Flex } from '@chakra-ui/react'

export const metadata = {
  title: 'SIS Faune'
}

const Layout = async ({ children }) => {
  const session = await auth()

  if (!session) {
    // return redirect('/session/ouvrir')
  }

  return (
    <Flex as={'main'} minH={'100vh'} flex={1} direction={'column'} justifyContent={'flex-start'} px={0} alignItems={'flex-start'}>
      {children}
    </Flex>
  )
}

export default Layout
