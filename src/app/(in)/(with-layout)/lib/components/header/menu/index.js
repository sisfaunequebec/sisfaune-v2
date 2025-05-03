'use server'
import getUser from '@/lib/auth/get-user'

import DesktopMenu from './desktop'
import MobileMenu from './mobile'

const Menu = async ({  }) => {
  const user = await getUser()

  return (
    <>
      <DesktopMenu user={user} />
      <MobileMenu user={user} />
    </>
  )
}

export default Menu
