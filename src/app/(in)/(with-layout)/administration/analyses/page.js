import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import PageContainer from '../../lib/components/page-container'
import ContentContainer from '../../lib/components/content-container'

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
        <ContentContainer>   
          <AnalysisList />
        </ContentContainer>
      </PageContainer>
    </>
  )
}

export default AnalysisAdminPage
