'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

// import wait from '@/utils/wait'

// import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPencil1 } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

// import EditLaboratoryDialog from './edit-laboratory-dialog.js'
import EditLocationDialog from './edit-location-dialog.js'

const EditLocationButton = ({ event }) => {
  const { mutate, cache } = useSWRConfig()
  
  const { ask: startEditing, dialog } = useDialog(EditLocationDialog)

  const handleClick = useCallback(async () => {
    // // console.debug(event)
    // const data = {
    //   labResponsible,
    //   labReceivedBy: labReceivedById ? { id: labReceivedById, label: labReceivedById } : null,
    //   labReceivedAt
    // }
{    await startEditing({ event })
}    // mutate()
  }, [event, mutate])

  return (
    <>
      {dialog}
      <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} onClick={handleClick} />
    </>
  )
}

export default EditLocationButton