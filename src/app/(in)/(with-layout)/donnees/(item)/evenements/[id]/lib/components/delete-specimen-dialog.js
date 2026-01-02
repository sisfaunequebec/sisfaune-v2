import wait from '@/utils/wait'

import { Text } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

const DeleteSpecimenDialog = ({ close, specimen, onDelete }) => {

  const { id: specimenId, eventId, sequenceId } = specimen

  const handleSubmit = async () => {
    await onDelete(specimenId)
    await wait(300)
    close(true)
  }

  return (
    <BaseDialog title={'Effacement d\'un spécimen'} message={null} onClose={close} onSubmit={handleSubmit} isAlert submitBtnLabel={'Effacer'}>
      {(contentRef, watched) => (
        <>
          <Text fontWeight={'bold'}>Vous vous apprêtez à effacer le spécimen {eventId}.{sequenceId} :</Text>
          <Text>Les analyses associées à ce spécimen seront aussi effacés. <br/>Cette action est irréversible !</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteSpecimenDialog
