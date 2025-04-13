import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'
import NewUserButton from './lib/components/new-user-button'

import Filters from './lib/components/filters'
import UsersList from './lib/containers/users-list'

const UsersAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <NewUserButton />
      </Toolbar>
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <UsersList />
        </Flex>
      </Flex>
    </>
  )
}

export default UsersAdminPage
