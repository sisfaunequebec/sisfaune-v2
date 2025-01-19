'use client'

import { useState, useEffect } from 'react'
import { Flex, Container } from '@chakra-ui/react'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useQueryState, useQueryStates, parseAsInteger, parseAsArrayOf } from 'nuqs'

import wait from '@/utilitaires/wait'

import ListeEvenements from './components/liste-evenements'
import Filtres from '../components/filtres'



const Evenements = () => {


  return (
    <>
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Filtres />
        <Flex flex={5} ps={[0, null, 2]} justifyContent={'center'} alignItems={'stretch'}>
          <ListeEvenements />
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements
