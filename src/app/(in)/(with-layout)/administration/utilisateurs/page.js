import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import PageContainer from '../../lib/components/page-container'
import ContentContainer from '../../lib/components/content-container'
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
        <ContentContainer>    
          <UsersList />
        </ContentContainer>
      </PageContainer>
    </>
  )
}

export default UsersAdminPage
