import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import PageContainer from '../../lib/components/page-container'
import SidebarContainer from '../../lib/components/sidebar-container'

import Toolbar from '../lib/components/toolbar'


export const metadata = {
  title: 'Administration - Tables de valeurs | SIS Faune'
}

const TablesAdminPage = async () => {
  return (
    <>
      <Toolbar />
      <PageContainer>
        <SidebarContainer/>
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          {/* <AnalysisList /> */}
        </Flex>
      </PageContainer>
    </>
  )
}

export default TablesAdminPage
