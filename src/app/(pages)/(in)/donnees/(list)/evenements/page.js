'use client'

import { useState, useEffect } from 'react'
import { Flex, Container } from '@chakra-ui/react'

import { useQueryState, useQueryStates, parseAsInteger, parseAsArrayOf } from 'nuqs'

import wait from '@/utilitaires/wait'

import ListeEvenements from './components/liste-evenements'
import Filtres from '../components/filtres'

const evenements = Array(50).fill(null).map((item, i) => {
  // console.debug('here')
  return {
    id: i + 1
  }
})

const useEvents = (statut) => {
  const [isBusy, setBusy] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetch = async() => {
      setBusy(true)
      await wait(Math.random() * 500)
      setBusy(false)
      setEvents(evenements)
    }
    fetch()
  }, [statut])

  return [isBusy, events]
}

const Evenements = () => {
  const [statut, setStatut] = useQueryState('statut', parseAsArrayOf(parseAsInteger).withDefault([]))
  // console.debug(statut)

  const [isBusy, events] = useEvents(statut)
  // console.debug(isBusy, events)

  return (
    <>
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Filtres />
        <Flex flex={5} ps={[0, null, 2]} justifyContent={'center'} alignItems={'stretch'}>
          <ListeEvenements evenements={events} isLoading={isBusy} />
        </Flex>
      </Flex>
    </>
  )
}

export default Evenements
