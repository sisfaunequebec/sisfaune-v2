'use client'
// import getUser from '@/lib/auth/get-user'
// import useCurrentUser from '@/lib/auth/use-user-v2' 


// import ExportManager from '../export-manager-v2'

import DesktopMenu from './desktop'
import MobileMenu from './mobile'

const Menu = ({ user, onOpenExportManager }) => {
  return (
    <>
      {/* <ExportManager /> */}
      <DesktopMenu account={user} onOpenExportManager={onOpenExportManager} />
      <MobileMenu account={user} onOpenExportManager={onOpenExportManager} />
    </>
  )
}

export default Menu
