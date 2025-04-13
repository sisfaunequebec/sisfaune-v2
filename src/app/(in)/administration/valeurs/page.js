import { AbsoluteCenter, Container, Flex, VStack } from '@chakra-ui/react'

import Toolbar from '../lib/components/toolbar'

const TablesAdminPage = async () => {
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Flex position='sticky' flex={2} h='calc(100vh - 162px)' overflowY='auto' top={154} p={3} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} borderBottomWidth={1} hideBelow='md'>
          {/* {children} */}
        </Flex>
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          {/* <AnalysisList /> */}
        </Flex>
      </Flex>
    </>
  )
}

export default TablesAdminPage
