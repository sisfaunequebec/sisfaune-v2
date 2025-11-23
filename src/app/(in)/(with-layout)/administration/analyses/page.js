import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import PageContainer from '../../lib/components/page-container'

import Toolbar from '../lib/components/toolbar'
import NewAnalysisButton from './lib/components/new-analysis-button'

import Filters from './lib/components/filters'
import AnalysisList from './lib/containers/analysis-list'

export const metadata = {
  title: 'Administration - Analyses | SIS Faune'
}

const AnalysisAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <NewAnalysisButton />
      </Toolbar>

      <PageContainer>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <AnalysisList />
        </Flex>
      </PageContainer>
    </>
  )
}

export default AnalysisAdminPage
