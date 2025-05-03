import { AbsoluteCenter, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'

export const metadata = {
  title: 'Administration - Système | SIS Faune'
}

const SystemAdminPage = async () => {
  return (
    <>
      <Toolbar />
      <AbsoluteCenter>
        <VStack>
          <Flex>Paramètres généraux</Flex>
        </VStack>
      </AbsoluteCenter>
    </>
  )
}

export default SystemAdminPage
