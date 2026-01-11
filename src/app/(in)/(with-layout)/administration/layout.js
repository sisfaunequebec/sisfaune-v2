import getUser from '@/lib/auth/get-user'

import { AbsoluteCenter } from '@chakra-ui/react'

import UnauthorizedMessage from '@/app/lib/components/unauthorized-message'

export const metadata = {
  title: 'Administration | SIS Faune'
}

const AdminLayout = async ({ children }) => {
  const user = await getUser()
  const { isAdmin } = user

  if (!isAdmin) {
    return (
      <AbsoluteCenter w={'full'}>
        <UnauthorizedMessage />
      </AbsoluteCenter>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default AdminLayout
