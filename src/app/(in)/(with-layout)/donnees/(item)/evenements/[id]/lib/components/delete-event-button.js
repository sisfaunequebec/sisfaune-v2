import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import { IconButton } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import { RxTrash } from 'react-icons/rx'

import { deleteEvent } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import DeleteEventDialog from './delete-event-dialog'

const DeleteEventButtonOld = ({ eventId }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmDelete, dialog: deleteEventDialog } = useDialog(DeleteEventDialog)

  const handleDeleteEvent = useCallback(async () => {
    const deleted = await confirmDelete({ eventId, onAdd: 123 })

    if (deleted) {
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
        // title: 'Événement effacé',
        title: `L'événement no ${eventId} a été effacé avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [confirmDelete, eventId, router, mutate, cache])

  return (
    <>
      {deleteEventDialog}
      <IconButton colorPalette={'red'} variant={'solid'} rounded={'full'} size={'xs'} onClick={handleDeleteEvent} visibility={'hidden'}><RxTrash /></IconButton>
    </>
  )
}

export default DeleteEventButtonOld
