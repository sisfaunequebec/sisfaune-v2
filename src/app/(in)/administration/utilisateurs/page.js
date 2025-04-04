import { AbsoluteCenter, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'
import NewUserButton from './lib/components/new-user-button'

const UsersAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <NewUserButton />
      </Toolbar>
      <AbsoluteCenter>
        <VStack>
          <Flex>Utilisateurs</Flex>
        </VStack>
      </AbsoluteCenter>
    </>
  )
}

export default UsersAdminPage
