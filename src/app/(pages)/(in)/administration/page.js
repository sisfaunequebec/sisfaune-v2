import { AbsoluteCenter, Flex, VStack } from '@chakra-ui/react'

import wait from '@/utilitaires/wait'

// import Test from './components/test'

const Administration = async () => {
  await wait(2000)
  return (
    <AbsoluteCenter>
      <VStack>
        <Flex>Administration</Flex>
        {/* <Test /> */}
      </VStack>
    </AbsoluteCenter>
  )
}

export default Administration
