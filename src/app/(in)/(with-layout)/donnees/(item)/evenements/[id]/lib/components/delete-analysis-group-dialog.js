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

  // console.debug('DeleteAnalysisDialog', { analysisGroup })
  const { name: analysisGroupName } = analysisGroup

  return (
    <BaseDialog title={'Effacement d\'un groupe d\'analyses'} message={null} onClose={close} onSubmit={handleSubmit} isAlert submitBtnLabel={'Effacer'}>
      {(contentRef, watched) => (
        <>
          <Text fontWeight={'bold'}>Vous vous apprêtez à effacer le groupe d&apos;analyses <br/> {analysisGroupName} :</Text>
          <Text>Les résultats associés à ce ce groupe seront aussi effacés. <br/>Cette action est irréversible !</Text>
        </>
      )}
    </BaseDialog>
  )
}

export default DeleteAnalysisDialog
