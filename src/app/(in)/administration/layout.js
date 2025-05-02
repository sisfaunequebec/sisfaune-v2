import getUser from '@/lib/auth/get-user'

import { VStack, EmptyState, AbsoluteCenter, Container} from '@chakra-ui/react'
import { RxExclamationTriangle } from 'react-icons/rx'

import UnauthorizedMessage from '@/app/lib/components/unauthorized-message'

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
