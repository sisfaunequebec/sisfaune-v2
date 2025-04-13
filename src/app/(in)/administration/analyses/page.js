import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'
import NewAnalysisButton from './lib/components/new-analysis-button'

import Filters from './lib/components/filters'
import AnalysisList from './lib/containers/analysis-list'

const AnalysisAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <NewAnalysisButton />
      </Toolbar>

      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <AnalysisList />
        </Flex>
      </Flex>
    </>
  )
}

export default AnalysisAdminPage
