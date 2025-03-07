// 'use client'

import { Flex, Container } from '@chakra-ui/react'

import wait from '@/utilitaires/wait'

import ListeSpecimens from './lib/containers/liste-specimens'
import Filtres from '../lib/components/filtres'

const Specimens = async () => {
  return (
    <>
      {/* <Toolbar /> */}
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Filtres />
        <Flex flex={5} ps={[0, null, 2]} justifyContent={'center'} alignItems={'stretch'}>
          <ListeSpecimens />
        </Flex>
      </Flex>
    </>
  )
}

export default Specimens
