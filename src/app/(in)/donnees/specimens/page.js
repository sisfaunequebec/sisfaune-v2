'use client'

import { Flex, Container } from '@chakra-ui/react'

import Toolbar from '../components/toolbar'

import ListeSpecimens from './components/liste-specimens'
import Filtres from '../components/filtres'

const specimens = Array(200).fill(null).map((item, i) => {
  return {
    id: i + 1,
    idEvenement: i + 1
  }
})

const Specimens = async () => {
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Filtres />
        <Flex flex={5} alignItems={'stretch'} ps={[0, null, 2]}>
          <ListeSpecimens specimens={specimens} />
        </Flex>
      </Flex>
    </>
  )
}

export default Specimens 
