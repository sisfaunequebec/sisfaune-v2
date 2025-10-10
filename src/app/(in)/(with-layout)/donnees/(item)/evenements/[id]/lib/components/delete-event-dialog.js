import wait from '@/utils/wait'

import { Text } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

const DeleteEventDialog = ({ close, eventId, onDelete }) => {
  // console.debug('here', eventId, onAdd)

  const handleSubmit = async () => {
    await onDelete(eventId)
    await wait(300)
    close(true)
  }

  return (
    <BaseDialog title={'Effacement d\'un événement'} message={null} onClose={close} onSubmit={handleSubmit} isAlert submitBtnLabel={'Effacer'}>
      {(contentRef, watched) => (
        <>
          <Text fontWeight={'bold'}>Vous vous apprêtez à effacer l&apos;événement no {eventId} :</Text>
          <Text>Les spécimens associés et les analyses associées à ces spécimens seront aussi effacés.</Text>
          <Text>Cette action est irréversible !</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteEventDialog
