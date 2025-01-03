'use client'
import { useCallback } from 'react'

import NextLink from 'next/link'

import { VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxTrash } from 'react-icons/rx'

import useDialog from '@/utilities/use-dialog'

import DetruireEvenementDialog from './detruire-evenement-dialog'

import { LinkListWrapper } from '@/app/(in)/components/list'

const ItemEvenement = ({ id, onDelete }) => {
  // const { id, onDelete } = props
  const href = `/donnees/evenements/${id}`

  const handleDelete = useCallback(async () => {
    const result = await onDelete({ eventId: id })
    if (result) {
      console.debug('Delete !!!')
    }
    // console.log(result)
  }, [id, onDelete])

  return (
    <LinkListWrapper href={href}>
      <LinkOverlay asChild>
        <NextLink href={href} scroll={false}>
          <Text color={'green.600'} _dark={{ color: 'green.200' }}>Événement no {id}</Text>
        </NextLink>
      </LinkOverlay>
      <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']} onClick={handleDelete}><RxTrash  /></IconButton>
    </LinkListWrapper>
  )
}

const ListeEvenements = ({ evenements }) => {

  const { ask: deleteEvent, dialog: deleteEventDialog } = useDialog(DetruireEvenementDialog)

  return (
    <>
    { deleteEventDialog }
    <VStack alignItems={'stretch'} flex={1} gap={0}>
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