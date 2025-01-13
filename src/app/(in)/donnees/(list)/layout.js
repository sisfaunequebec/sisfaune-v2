// import { redirect } from 'next/navigation'
// import { auth, signOut } from '@/auth'
'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'

// import { Flex, Container } from '@chakra-ui/react'

// import Header from './components/header'
import Toolbar from './components/toolbar'

const Layout = ({ children }) => {
  return (
    <>
      <Toolbar />
      <NuqsAdapter>{children}</NuqsAdapter>
    </>
  )
}

export default Layout
