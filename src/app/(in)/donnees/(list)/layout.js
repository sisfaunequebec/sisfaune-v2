import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'

import { Flex, Container } from '@chakra-ui/react'

// import Header from './components/header'
import Toolbar from './components/toolbar'

const Layout = async ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default Layout


