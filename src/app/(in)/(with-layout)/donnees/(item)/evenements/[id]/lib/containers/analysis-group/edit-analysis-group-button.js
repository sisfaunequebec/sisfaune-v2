'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPencil1 } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import EditAnalysisGroupDialog from './edit-analysis-group-dialog'

const EditAnalysisGroupButton = ({ analysisGroup }) => {
  console.debug('EditAnalysisGroupButton', analysisGroup)
  const { mutate, cache } = useSWRConfig()
  
  const { ask: startEditing, dialog } = useDialog(EditAnalysisGroupDialog)

  const handleClick = useCallback(async () => {
    const { id: eventId } = analysisGroup
    await startEditing({ eventId, data: analysisGroup })
    mutate()
  }, [startEditing, analysisGroup, mutate])

  return (
    <>
      {dialog}
      <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} onClick={handleClick} />
    </>
  )
}

export default EditAnalysisGroupButton