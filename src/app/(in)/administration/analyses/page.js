import { AbsoluteCenter, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'
import NewAnalysisButton from './lib/components/new-analysis-button'

const AnalysisAdminPage = async () => {
  return (
    <>
      <Toolbar>
        <Flex>
          <NewAnalysisButton />
        </Flex>
      </Toolbar>
      <AbsoluteCenter>
        <VStack>
          <Flex>Analyses</Flex>
        </VStack>
      </AbsoluteCenter>
    </>
  )
}

export default AnalysisAdminPage
