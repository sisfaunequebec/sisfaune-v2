import { useCallback } from 'react'

import { IconButton } from '@chakra-ui/react'
import { RxTrash } from 'react-icons/rx'

import useDialog from '@/utilitaires/use-dialog'

import DeleteEventDialog from './detruire-evenement-dialog'

const DeleteEventButton = ({ eventId, ...rest }) => {
  const { ask: deleteEvent, dialog: deleteEventDialog } = useDialog(DeleteEventDialog)

  const handleDeleteEvent = useCallback(async () => {
    const result = await deleteEvent({ eventId })
    if (result) {
      console.debug(`Delete event ${eventId}`)
    }
  }, [eventId, deleteEvent])

  return (
    <>
      {deleteEventDialog}
      <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']} onClick={handleDeleteEvent} {...rest}><RxTrash /></IconButton>
    </>
  )
}

export default DeleteEventButton
