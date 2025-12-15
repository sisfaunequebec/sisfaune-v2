/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import { useCallback } from 'react'

import { useRouter, useParams } from 'next/navigation'

import { useSWRConfig } from 'swr'

// import { useWindowScroll } from '@uidotdev/usehooks'

// import Link from 'next/link'

import { Flex, Container, Button, IconButton, HStack } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import { RxArrowLeft, RxFileText , RxTrash} from 'react-icons/rx'

import { deleteEvent } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import DeleteEventDialog from './delete-event-dialog'

import ToolbarWrapper from '@/app/lib/components/toolbar-wrapper'
import ResponsiveButton from '@/app/lib/components/responsive-button'

import ReportButton from '../../../../../(list)/lib/containers/toolbar/report-button'

const DeleteEventButton = ({ eventId }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmDelete, dialog: deleteEventDialog } = useDialog(DeleteEventDialog)

  const handleDeleteEvent = useCallback(async () => {
    const result = await confirmDelete({ eventId, onDelete: deleteEvent })
    
    if (result) {
      router.replace(`/donnees/evenements/`)

      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }
      
      toaster.create({
        title: `L'événement no ${eventId} a été effacé avec succès...`,
        type: 'success',
        duration: 3000,
      })

      return result
    }
  }, [confirmDelete, eventId, router])

  return (
    <>
      {deleteEventDialog}
      <ResponsiveButton label={'Effacer l\'événement'} variant={'surface'} colorPalette={'red'} icon={<RxTrash />} onClick={handleDeleteEvent} />
    </>
  )
}

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = useCallback(() => {
    router.push('/donnees', { scroll: false })
  }, [router])

  return (
    <ResponsiveButton label={'Retour à la liste'} variant={'subtle'} colorPalette={'green'} icon={<RxArrowLeft />} onClick={handleGoBack} />
  )
}

const Toolbar = ({ canDeleteEvent }) => {
  const params = useParams()
  const { id } = params

  const eventId = parseInt(id, 10)

  return (
    <ToolbarWrapper shadow={false}>
      <HStack justifyContent={'space-between'} gap={2}>
        <HStack justifyContent={'space-between'} gap={2}>
          <BackButton />
        </HStack>
        <HStack justifyContent={'space-between'} gap={2}>
          {/* <ReportButton eventId={eventId} /> */}
          { canDeleteEvent && <DeleteEventButton eventId={eventId} /> }
        </HStack>
      </HStack>
    </ToolbarWrapper>
  )
}

export default Toolbar
