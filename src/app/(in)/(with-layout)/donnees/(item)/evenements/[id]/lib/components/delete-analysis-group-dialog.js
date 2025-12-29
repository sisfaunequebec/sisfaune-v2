import wait from '@/utils/wait'

import { Text } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

const DeleteAnalysisDialog = ({ close, analysisGroup, onDelete }) => {

  const { id: analysisGroupId, eventId } = analysisGroup

  const handleSubmit = async () => {
    await onDelete(eventId, analysisGroupId)
    await wait(300)
    close(true)
  }

  return (
    <BaseDialog title={'Effacement d\'un groupe d\'analyses'} message={null} onClose={close} onSubmit={handleSubmit} isAlert submitBtnLabel={'Effacer'}>
      {(contentRef, watched) => (
        <>
          <Text fontWeight={'bold'}>Vous vous apprêtez à effacer ce groupe d&apos;analyses :</Text>
          <Text>Les résultats associés à ce ce groupe seront aussi effacés.</Text>
          <Text>Cette action est irréversible !</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteAnalysisDialog
