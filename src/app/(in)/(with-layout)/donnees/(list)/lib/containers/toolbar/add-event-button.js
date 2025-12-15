'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPlus } from 'react-icons/rx'

import { addEvent } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddEventDialog from './add-event-dialog'

const AddEventButton = ({ programs }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmAdd, dialog: addEventDialog } = useDialog(AddEventDialog)

  const handleCreateEvent = useCallback(async () => {
    const result = await confirmAdd({ programs, onAdd: addEvent })

    if (result) {
      const { id: addedEventId } = result
      router.replace(`/donnees/evenements/${addedEventId}`)
      await wait(1000)
      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }

      const { id: addEventId } = added

      toaster.create({
        title: `L'événement no ${addEventId} a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [confirmAdd, programs, router, mutate, cache])

  return (
    <>
      {addEventDialog}
      <ResponsiveButton label={'Nouvel événement'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleCreateEvent} />
    </>
  )
}

export default AddEventButton