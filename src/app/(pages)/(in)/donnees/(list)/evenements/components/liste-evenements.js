'use client'
import { useState, useEffect } from 'react'

import NextLink from 'next/link'

import { Flex, Stack, HStack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'

import { useQueryState, useQueryStates, parseAsInteger, parseAsArrayOf, parseAsString } from 'nuqs'

import wait from '@/utilitaires/wait'

import { LinkListWrapper } from '@/app/(pages)/(in)/components/list'

const ItemEvenement = ({ id }) => {
  const href = `/donnees/evenements/${id}`

  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]}>
        <VStack alignItems={'flex-start'} gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex as={NextLink} href={href} scroll={false} flex={1} color={'green.600'} _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>Événement no {id}</Text>&nbsp;
              <Text>(MAPAQ 25000000161)</Text>
            </Flex>
          </LinkOverlay>
          <Flex>Surveillance de la rage du raton laveur</Flex>
          <Flex display={['none', null, null, 'inherit']}>Numéro SILAB :</Flex>
        </VStack>
        <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}>
          <Flex display={['none', null, null, 'inherit']}>Soumis par : Administrateur du système</Flex>
          <Flex color={'blue.600'} >Date du signalement : 2025-01-01</Flex>
          <Flex display={['none', null, null, 'inherit']}>Municipalité : Montréal</Flex>
        </VStack>
      </Stack>
      <IconButton as={NextLink} href={href} scroll colorPalette={'green'} variant={'surface'} rounded={'full'} size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

const evenements = Array(50).fill(null).map((item, i) => {
  return {
    id: i + 1
  }
})


const useEvents = (params) => {
  const [isBusy, setBusy] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetch = async(params) => {
      console.debug('fetching => ', params)
      setBusy(true)
      await wait(Math.random() * 500)
      setBusy(false)
      setEvents(evenements)
    }
    fetch(params)
  }, [params])

  return [isBusy, events]
}

const ListeEvenements = ({ evenements, isLoading }) => {
  const [params, setParams] = useQueryStates({
    texte: parseAsString.withDefault(''),
    statut: parseAsArrayOf(parseAsInteger),
    programme: parseAsArrayOf(parseAsInteger),
    region: parseAsArrayOf(parseAsInteger),
  })

  const [isBusy, events] = useEvents(params)

  return (
    <VStack alignItems={'stretch'} flex={1} gap={0} justifyContent={'stretch'} opacity={isBusy && 0.2}>
      {events.map(event => {
        const { id } = event
        return (
          <ItemEvenement key={id} {...event} />
        )
      })}
    </VStack>
  )
}

export default ListeEvenements
