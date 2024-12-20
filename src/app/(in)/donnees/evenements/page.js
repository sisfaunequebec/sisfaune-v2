'use client'
import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, Text, IconButton } from '@chakra-ui/react'
import { RxTrash, RxPlus } from 'react-icons/rx'

import Toolbar from '../components/toolbar'

const evenements = Array(20).fill(null).map((item, i) => {
  return {
    id: i + 1
  }
})

const ListItem = (props) => {
  const { id } = props
  return (
    <Flex
      as={NextLink}
      alignItems={'center'} justifyContent={'space-between'}
      href={`/donnees/evenements/${id}`}
      px={4} ps={6} py={3} 
      fontWeight={500} 
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
      <Text color={'green.600'}>Événement no {id}</Text>
      <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']} onClick={() => alert('click')}><RxTrash  /></IconButton>
    </Flex>
  )
}

const Evenements = async () => {
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Flex flex={2} p={4} px={6} alignItems={'stretch'} bg={'blue.100'} top={0} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'}>
          Filtres
        </Flex>
        <Flex flex={5} alignItems={'stretch'} ps={[0, null, 2]}>
          <VStack alignItems={'stretch'} flex={1} gap={0}>
            {evenements.map(evenement => {
              const { id } = evenement
              return (
                <ListItem key={id} {...evenement} />
              )
            })}
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements 
