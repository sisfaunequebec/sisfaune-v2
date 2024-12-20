import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs } from '@chakra-ui/react'

import Toolbar from '../components/toolbar'

const items = Array(20).fill(null).map((item, i) => {
  return {
    value: i,
    label: i + 1
  }
})

const ListItem = () => {
  return (
    <Flex
      as={NextLink}
      href={'/donnees/evenements/toto'}
      p={4}
      px={6}
      borderBottomColor={'green.300'}
      borderBottomWidth={1}
      _first={{
        borderTopColor: 'green.300',
        borderTopWidth: 1
      }}
      _even={{ bg: 'white' }} 
      _odd={{ bg: 'green.50' }}
      _hover={{
         bg: 'green.100'
      }}
      cursor={'pointer'}
    >
      Événement
    </Flex>
  )
}

const Evenements = async () => {
  return (
    <>
      <Toolbar />
      <Flex top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Flex flex={2} p={4} alignItems={'stretch'} bg={'blue.100'} top={0} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'}>
          Filtres
        </Flex>
        <Flex flex={5} alignItems={'stretch'} ps={[0, null, 2]}>
          <VStack alignItems={'stretch'} flex={1} gap={0}>
            {items.map((item) => (
              <ListItem key={item.value} />
            ))}
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements 
