'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPencil1 } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import EditGeneralInfosDialog from './edit-general-infos-dialog'

const EditGeneralInfosButton = ({ event }) => {
  const { mutate, cache } = useSWRConfig()
  
  const { ask: startEditing, dialog } = useDialog(EditGeneralInfosDialog)

  const handleClick = useCallback(async () => {
    // console.debug(event)
    const { id: eventId } = event
    const data = {
      ...event
      // labResponsible,
      // labReceivedBy: labReceivedById ? { id: labReceivedById, label: labReceivedById } : null,
      // labReceivedAt
    }
    await startEditing({ eventId, data })
    mutate()
  }, [startEditing, event, mutate])

  return (
    <>
      {dialog}
      <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} onClick={handleClick} />
    </>
  )
}

export default EditGeneralInfosButton