import wait from '@/utils/wait'

import { Text } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

const DeleteEventDialog = ({ close, eventId }) => {
  const handleSubmit = async (data) => {
    await wait(300)
    close(true)
  }

  return (
    <BaseDialog title={'Effacement d\'un événement'} message={null} onClose={close} onSubmit={handleSubmit} isAlert>
      {(contentRef, watched) => (
        <>
          <Text fontWeight='bold'>Attention&nbsp;! Voulez-vous réellement effacer l&apos;événement no {eventId}&nbsp;?</Text>
          <Text>Cette action est irréversible...</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteEventDialog
