// import { useWindowScroll } from '@uidotdev/usehooks'
import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, Text } from '@chakra-ui/react'

import { SegmentedControl } from '@/components/ui/segmented-control'

import Toolbar from '../components/toolbar'

const specimens = Array(2).fill(null).map((item, i) => {
  return {
    id: i + 1,
    idEvenement: i + 1
  }
})

const ListItem = (props) => {
  const { id, idEvenement } = props
  return (
    <Flex
      as={NextLink}
      href={`/donnees/evenements/${idEvenement}`}
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
      <Text fontWeight={500} color={'green.600'}>Spécimen no {id}</Text>
    </Flex>
  )
}

const Specimens = async () => {
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Flex flex={2} p={4} px={6} alignItems={'stretch'} bg={'blue.100'} top={0} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'}>
          Filtres
        </Flex>
        <Flex flex={5} alignItems={'stretch'} ps={[0, null, 2]}>
          <VStack alignItems={'stretch'} flex={1} gap={0}>
            {specimens.map(specimen => {
              const { id } = specimen
              return (
                <ListItem key={id} {...specimen} />
              )
            })}
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}

export default Specimens 
