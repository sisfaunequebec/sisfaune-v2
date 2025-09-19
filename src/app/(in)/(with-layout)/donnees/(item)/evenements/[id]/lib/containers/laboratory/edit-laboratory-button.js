'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPencil1 } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import EditLaboratoryDialog from './edit-laboratory-dialog.js'

const EditLaboratoryButton = ({ event }) => {
  const { mutate, cache } = useSWRConfig()
  
  const { ask: startEditing, dialog: editLaboratoryDialog } = useDialog(EditLaboratoryDialog)

  const handleClick = useCallback(async () => {
    // console.debug(event)
    const { id: eventId, labReceivedAt, labResponsible, labReceivedBy: labReceivedById } = event
    const data = {
      labResponsible,
      labReceivedBy: labReceivedById ? { id: labReceivedById, label: labReceivedById } : null,
      labReceivedAt
    }
    await startEditing({ eventId, data })
    mutate()
  }, [startEditing, event, mutate])

  return (
    <>
      {editLaboratoryDialog}
      <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} onClick={handleClick} />
    </>
  )
}

export default EditLaboratoryButton