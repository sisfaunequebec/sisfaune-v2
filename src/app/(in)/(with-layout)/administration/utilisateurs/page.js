import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import PageContainer from '../../lib/components/page-container'
import Toolbar from '../lib/components/toolbar'
import NewUserButton from './lib/components/new-user-button'

import Filters from './lib/components/filters'
import UsersList from './lib/containers/users-list'

export const metadata = {
  title: 'Administration - Utilisateurs | SIS Faune'
}

const UsersAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <NewUserButton />
      </Toolbar>
      <PageContainer>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <UsersList />
        </Flex>
      </PageContainer>
    </>
  )
}

export default UsersAdminPage
