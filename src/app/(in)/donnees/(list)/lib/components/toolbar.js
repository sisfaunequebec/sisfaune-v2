/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import { useCallback } from 'react'

import { useWindowScroll } from '@uidotdev/usehooks'

import { Flex, Container, IconButton, HStack } from '@chakra-ui/react'
import { RxPlus, RxDownload, RxMagnifyingGlass } from 'react-icons/rx'

import useDialog from '@/utilitaires/use-dialog'

import ResponsiveButton from '@/components/responsive-button'

import EvenementsSpecimens from './evenements-specimens-tabs'

import AddEventDialog from '../../../(item)/evenements/[id]/lib/containers/add-event-dialog/index.js'
import ExportDialog from '../containers/export-dialog'

const NewEventButton = () => {
  const { ask: createEvent, dialog: createEventDialog } = useDialog(AddEventDialog)

  const handleCreate = useCallback(async () => {
    const result = await createEvent()
    if (result) {
      console.debug('Create !!!')
    }
  }, [createEvent])

  return (
    <>
      {createEventDialog}
      <ResponsiveButton label={'Nouvel événement'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleCreate} />
    </>
  )
}

const DownloadButton = () => {
  const { ask: downloadEvents, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleDownload = useCallback(async () => {
    const result = await downloadEvents()
    if (result) {
      console.debug('Download !!!')
    }
  }, [downloadEvents])

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton label={'Exporter'} colorPalette={'blue'} icon={<RxDownload />} onClick={handleDownload} />
    </>
  )
}

const Toolbar = () => {
  const [{ y }] = useWindowScroll()

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
      <Flex flex={1} bg='white' _dark={{ bg: 'black' }} py={1}>
        <Container maxWidth={'6xl'} py={2}>
          <HStack justifyContent='space-between' gap={2}>

            <HStack justifyContent='space-between' gap={2}>
              <IconButton size={['md', null, 'sm']} rounded='full' variant='subtle' colorPalette='blue' aria-label='Search database' display={['inherit', null, 'none']}><RxMagnifyingGlass /></IconButton>
              <EvenementsSpecimens />
            </HStack>

            <HStack justifyContent='space-between' gap={2}>
              <DownloadButton />
              <NewEventButton />
            </HStack>

          </HStack>

        </Container>
      </Flex>

    </Flex>

  )
}

export default Toolbar
