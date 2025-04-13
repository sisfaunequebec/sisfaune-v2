// 'use client'

import { Flex, Container } from '@chakra-ui/react'

import EventsList from './lib/containers/events-list'
import Filters from '../lib/components/filters'

const Evenements = async () => {
  return (
    <>
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <EventsList />
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements
