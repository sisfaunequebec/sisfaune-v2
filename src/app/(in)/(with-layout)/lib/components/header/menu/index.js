'use client'
// import getUser from '@/lib/auth/get-user'
// import useCurrentUser from '@/lib/auth/use-user-v2' 

import DesktopMenu from './desktop'
import MobileMenu from './mobile'

const Menu = ({ user }) => {
  return (
    <>
      <DesktopMenu account={user} />
      <MobileMenu account={user} />
    </>
  )
}

export default Menu
