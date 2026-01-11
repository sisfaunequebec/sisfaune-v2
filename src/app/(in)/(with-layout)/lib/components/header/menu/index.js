import getUser from '@/lib/auth/get-user'

import DesktopMenu from './desktop'
import MobileMenu from './mobile'

const Menu = async () => {
  const user  = await getUser()

  return (
    <>
      <DesktopMenu account={user} />
      <MobileMenu account={user} />
    </>
  )
}

export default Menu
