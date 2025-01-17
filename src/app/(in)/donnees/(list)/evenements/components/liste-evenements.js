'use client'

import NextLink from 'next/link'

import { Flex, Stack, HStack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'

import useDialog from '@/utilities/use-dialog'

import DetruireEvenementDialog from './detruire-evenement-dialog'

import { LinkListWrapper } from '@/app/(in)/components/list'

const ItemEvenement = ({ id, onDelete }) => {
  // const { id, onDelete } = props
  const href = `/donnees/evenements/${id}`

  // const handleDelete = useCallback(async () => {
  //   const result = await onDelete({ eventId: id })
  //   if (result) {
  //     console.debug('Delete !!!')
  //   }
  //   // console.log(result)
  // }, [id, onDelete])

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
          <Flex>Numéro SILAB :</Flex>
        </VStack>
        <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}>
          <Flex>Soumis par : Administrateur du système</Flex>
          <Flex color={'blue.600'} >Date du signalement : 2025-01-01</Flex>
          <Flex>Municipalité : Montréal</Flex>
        </VStack>
      </Stack>
      <IconButton as={NextLink} href={href} scroll colorPalette={'green'} variant={'surface'} rounded={'full'} size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

const ListeEvenements = ({ evenements, isLoading }) => {
  const { ask: deleteEvent, dialog: deleteEventDialog } = useDialog(DetruireEvenementDialog)

  return (
    <>
      {deleteEventDialog}
      <VStack alignItems={'stretch'} flex={1} gap={0} justifyContent={'stretch'} opacity={isLoading && 0.2}>
        {evenements.map(evenement => {
          const { id } = evenement
          return (
            <ItemEvenement key={id} {...evenement} onDelete={deleteEvent} />
          )
        })}
      </VStack>
    </>
  )
}

export default ListeEvenements
