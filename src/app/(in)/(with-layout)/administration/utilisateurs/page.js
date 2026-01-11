import PageContainer from '../../lib/components/page-container'
import ContentContainer from '../../lib/components/content-container'
import Toolbar from '../lib/components/toolbar'
import AddUserButton from './lib/components/add-user-button'

import Filters from './lib/components/filters'
import UsersList from './lib/containers/users-list'

export const metadata = {
  title: 'Administration - Utilisateurs | SIS Faune'
}

const UsersAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <AddUserButton />
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
