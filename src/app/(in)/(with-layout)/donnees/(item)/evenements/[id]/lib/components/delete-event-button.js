import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import { IconButton } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import { RxTrash } from 'react-icons/rx'

import { deleteEvent } from '@/lib/data/events/service'

import useDialog from '@/utilitaires/use-dialog'

import DeleteEventDialog from './detruire-evenement-dialog'

const DeleteEventButton = ({ eventId, ...rest }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()



  const { ask: confirmDelete, dialog: deleteEventDialog } = useDialog(DeleteEventDialog)

  const handleDeleteEvent = useCallback(async () => {
    const result = await confirmDelete({ eventId })
    if (result) {
      router.back()
      await deleteEvent(eventId, { user: { permissions: [] } })
      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }
      toaster.create({
        title: 'Événement effacé',
        description: `L'événement no ${eventId} a été effacé avec succès...`,
        type: 'success',
        duration: 6000,
      })
    }
  }, [confirmDelete, eventId, router])

  return (
    <>
      {deleteEventDialog}
      <IconButton colorPalette='red' variant='solid' rounded='full' size={['xs']} onClick={handleDeleteEvent} {...rest}><RxTrash /></IconButton>
    </>
  )
}

export default DeleteEventButton
