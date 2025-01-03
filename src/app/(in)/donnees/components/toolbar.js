'use client'
import { useCallback } from 'react'

import { useWindowScroll } from '@uidotdev/usehooks'

import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, IconButton, HStack, Link } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { RxPlus, RxDownload, RxUpload, RxMagnifyingGlass } from 'react-icons/rx'

import useDialog from '@/utilities/use-dialog'

import EvenementsSpecimens from './evenements-specimens-tabs'
import AjouterEvenementDialog from '../evenements/components/ajouter-evenement-dialog'

const NewEventButton = () => {
  const { ask: createEvent, dialog: createEventDialog } = useDialog(AjouterEvenementDialog)

  const handleCreate = useCallback(async () => {
    const result = await createEvent()
    if (result) {
      console.debug('Create !!!')
    }
  }, [createEvent])

  return (
    <>
      {createEventDialog}
      <Button size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} display={['none', null, 'inherit']} onClick={handleCreate}><RxPlus />Nouvel événement</Button>
      <IconButton size={['md', null, 'sm']} rounded='full'  variant={'solid'} colorPalette={'blue'} aria-label='Search database' display={['inherit', null, 'none']} onClick={handleCreate}><RxPlus /></IconButton>
    </>
  )
}

const Toolbar = () => {
  const [{ x, y }, scrollTo] = useWindowScroll()

  const toolbarShadowSize = y > 70 ? 'md' : null
  // const paddingTop = y > 70 ? 2 : null

  return (
    <Flex
      // flex={1}
      position={'sticky'}
      top={'70px'}
      alignSelf={'flex-start'}
      width={'full'}
      zIndex={1001}
      shadow={[null, null, toolbarShadowSize]}
    >
      <Flex flex={1} bg={'white'} _dark={{ bg: 'black' }} py={1}>
        <Container maxWidth={'6xl'} py={2}>
          <HStack justifyContent={'space-between'} gap={2}>

            <HStack justifyContent={'space-between'} gap={2}>
              <IconButton size={['md', null, 'sm']} rounded='full' variant={'subtle'} colorPalette={'blue'} aria-label='Search database' display={['inherit', null, 'none']}><RxMagnifyingGlass /></IconButton>  
              <EvenementsSpecimens />
            </HStack>

            <HStack justifyContent={'space-between'} gap={2}>
              <IconButton size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} aria-label='Search database'  ><RxDownload /></IconButton>
              {/* <IconButton size={'sm'} rounded='full'  variant={'subtle'} colorPalette={'blue'} aria-label='Search database'  ><RxUpload /></IconButton> */}
              {/* <IconButton size={'sm'} rounded='full'  variant={'solid'} colorPalette={'blue'} aria-label='Search database'  ><RxPlus /></IconButton> */}
              <NewEventButton/>
            </HStack>

          </HStack>

        </Container>
    </Flex>

  </Flex>

  )

}

export default Toolbar