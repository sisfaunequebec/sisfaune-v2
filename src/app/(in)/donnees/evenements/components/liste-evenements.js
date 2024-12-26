'use client'
import { useCallback } from 'react'

import NextLink from 'next/link'

import { VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxTrash } from 'react-icons/rx'

import { LinkListWrapper } from '@/app/(in)/components/list'

const ItemEvenement = (props) => {
  const { id } = props
  const href = `/donnees/evenements/${id}`

  const handleDelete = useCallback(() => {
    alert(`Effacer evenement id = ${id}`)
  }, [id])

  return (
    <LinkListWrapper href={href}>
      <LinkOverlay asChild>
        <NextLink href={href} scroll={false}>
          <Text color={'green.600'}>Événement no {id}</Text>
        </NextLink>
      </LinkOverlay>
      <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']} onClick={handleDelete}><RxTrash  /></IconButton>
    </LinkListWrapper>
  )
}

const ListeEvenements = ({ evenements }) => {
  return (
    <VStack alignItems={'stretch'} flex={1} gap={0}>
      {evenements.map(evenement => {
        const { id } = evenement
        return (
          <ItemEvenement key={id} {...evenement} />
        )
      })}
    </VStack>
  )
}

export default ListeEvenements