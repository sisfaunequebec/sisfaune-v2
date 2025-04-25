import getUser from '@/lib/auth/get-user'

import { VStack, EmptyState, AbsoluteCenter } from '@chakra-ui/react'
import { RxExclamationTriangle } from 'react-icons/rx'

const Unauthorized = () => {
  return (
    <EmptyState.Root size={['md']} p={0}>
      <EmptyState.Content gap={4}>
        <EmptyState.Indicator>
          <RxExclamationTriangle />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title fontSize={['2xl', null, 'xl']}>Désolé !</EmptyState.Title>
          <EmptyState.Description fontSize={['lg', null, 'md']}>
            Vous n&apos;êtes pas autorisé<br/> à consulter cette page
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

const AdminLayout = async ({ children }) => {
  const user = await getUser
  const { isAdmin } = user

  if (!isAdmin) {
    return (
      <AbsoluteCenter>
        <Unauthorized />
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
