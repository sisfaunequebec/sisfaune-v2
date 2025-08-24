import wait from '@/utils/wait'

import { Text } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

const DeleteSpecimenDialog = ({ close, specimenId, onDelete }) => {

  const handleSubmit = async () => {
    await onDelete(specimenId)
    await wait(300)
    close(true)
  }

  return (
    <BaseDialog title={'Effacement d\'un spécimen'} message={null} onClose={close} onSubmit={handleSubmit} isAlert submitBtnLabel={'Effacer'}>
      {(contentRef, watched) => (
        <>
          <Text fontWeight={'bold'}>Vous vous apprêtez à effacer le spécimen no {specimenId} :</Text>
          <Text>Les analyses associées à ce spécimen seront aussi effacés.</Text>
          <Text>Cette action est irréversible !</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteSpecimenDialog
