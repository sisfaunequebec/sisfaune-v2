// import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs } from '@chakra-ui/react'

import { SegmentedControl } from '@/components/ui/segmented-control'

import Toolbar from './components/toolbar'

const items = Array(20).fill(null).map((item, i) => {
  return {
    value: i,
    label: i + 1
  }
})

const ListItem = () => {
  return (
    <Flex
      p={4}
      borderBottomColor={'green.300'}
      borderBottomWidth={1}
      _first={{
        borderTopColor: 'green.300',
        borderTopWidth: 1
      }}
      _odd={{ bg: 'white' }} 
      _even={{ bg: 'green.50' }}
      _hover={{
         bg: 'green.100'
      }}
      cursor={'pointer'}
    >
      Item
    </Flex>
  )
}

const Evenements = async () => {
  return (
    <>
      <Toolbar />

      <Flex as={Container} direction={['column', null, 'row']} maxWidth={['4xl']} p={{ smToMd: 0 }}>
        <Flex flex={2} p={4} alignItems={'stretch'} bg={'blue.100'} position={'sticky'} top={0} borderColor={'blue.300'} borderTopWidth={1}>
          Filtres
        </Flex>
        <Flex flex={5} alignItems={'stretch'}>
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
