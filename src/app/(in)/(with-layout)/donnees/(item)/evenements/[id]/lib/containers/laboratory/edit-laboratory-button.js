'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPencil1 } from 'react-icons/rx'

// import { addEvent } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import EditLaboratoryDialog from './edit-laboratory-dialog.js'

const EditLaboratoryButton = ({ programs }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: startEditing, dialog: editLaboratoryDialog } = useDialog(EditLaboratoryDialog)

  // const handleCreateEvent = useCallback(async () => {
  //   const added = await confirmAdd({ programs, onAdd: addEvent })

  //   if (added) {
  //     const { id: addedEventId } = added
  //     router.replace(`/donnees/evenements/${addedEventId}`)
  //     await wait(1000)
  //     for (const key of cache.keys()) {
  //       if (key.includes('/api/data/events')) {
  //         mutate(key)
  //       }
  //       if (key.includes('/api/data/specimens')) {
  //         mutate(key)
  //       }
  //     }

  //     const { id: addEventId } = added

  //     toaster.create({
  //       title: 'Événement ajouté',
  //       description: `L'événement no ${addEventId} a été ajouté avec succès...`,
  //       type: 'success',
  //       duration: 6000
  //     })
  //   }
  // }, [confirmAdd, programs, router, mutate, cache])

  return (
    <>
      {editLaboratoryDialog}
      <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} onClick={startEditing} />
    </>
  )
}

export default EditLaboratoryButton