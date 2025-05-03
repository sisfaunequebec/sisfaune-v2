import { Toaster } from '@/app/lib/components/ui/toaster'

import Header from './lib/components/header'

const Layout = async ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      {children}
    </>
  )
}

export default Layout
