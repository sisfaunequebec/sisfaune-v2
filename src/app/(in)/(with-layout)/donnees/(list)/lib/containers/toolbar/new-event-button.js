'use client'
import { useCallback } from 'react'

import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddEventDialog from './add-event-dialog'

const NewEventButton = ({ programs }) => {
  const { ask: createEvent, dialog: createEventDialog } = useDialog(AddEventDialog)

  const handleCreate = useCallback(async () => {
    const result = await createEvent({ programs })
    if (result) {
      console.debug('Create !!!')
    }
  }, [createEvent])

  return (
    <>
      {createEventDialog}
      <ResponsiveButton label={'Nouvel événement'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleCreate} />
    </>
  )
}

export default NewEventButton