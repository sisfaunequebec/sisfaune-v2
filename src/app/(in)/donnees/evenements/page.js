// 'use client'
// import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, Text, IconButton, LinkOverlay } from '@chakra-ui/react'

// import { RxTrash, RxPlus } from 'react-icons/rx'

import wait from '@/utilities/wait'

import Toolbar from '../components/toolbar'

import ListeEvenements from './components/liste-evenements'
import Filtres from '../components/filtres'

const evenements = Array(200).fill(null).map((item, i) => {
  return {
    id: i + 1
  }
})

const Evenements = async () => {
  await wait(500) // simulate latency
  return (
    <>
      {/* <Toolbar /> */}
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Filtres />
        <Flex flex={5} alignItems={'stretch'} ps={[0, null, 2]}>
          <ListeEvenements evenements={evenements} />
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements 
