'use client'
import { useCallback } from 'react'

import NextLink from 'next/link'

import { VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxTrash } from 'react-icons/rx'

import { LinkListWrapper } from '@/app/(in)/components/list'

const ItemSpecimen = (props) => {
  const { id, idEvenement } = props
  const href = `/donnees/evenements/${idEvenement}`

  const handleDelete = useCallback(() => {
    alert(`Effacer specimen id = ${id}`)
  }, [id])

  return (
    <LinkListWrapper href={href}>
      <LinkOverlay asChild>
        <NextLink href={href}>
          <Text color={'green.600'}>Spécimen no {id}</Text>
        </NextLink>
      </LinkOverlay>
      <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']} onClick={handleDelete}><RxTrash  /></IconButton>
    </LinkListWrapper>
  )
}

const ListeSpecimens = ({ specimens }) => {
  return (
    <VStack alignItems={'stretch'} flex={1} gap={0}>
      {specimens.map(specimen => {
        const { id } = specimen
        return (
          <ItemSpecimen key={id} {...specimen} />
        )
      })}
    </VStack>
  )
}

export default ListeSpecimens