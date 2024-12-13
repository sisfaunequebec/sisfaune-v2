import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs } from '@chakra-ui/react'

import Toolbar from '../components/toolbar'

const Evenement = async () => {
  return (
    <>
      <Toolbar />
      <Flex top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} py={[4]} fontSize={['md', null, 'sm']}>
        {/* <Flex flex={2} p={4} alignItems={'stretch'} bg={'blue.100'} position={'sticky'} top={0} borderColor={'blue.300'} borderTopWidth={1}>
          Filtres
        </Flex> */}
        <Flex flex={5} alignItems={'stretch'}>
          Détails
        </Flex>
      </Flex>
    </>
  )
}

export default Evenement
