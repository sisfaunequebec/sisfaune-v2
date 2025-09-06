'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPlus } from 'react-icons/rx'

// import { addEvent } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddSpecimenDialog from '.'

const AddSpecimenButton = ({ eventId }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmAdd, dialog: addSpecimenDialog } = useDialog(AddSpecimenDialog)

  const handleAddSpecimen = useCallback(async () => {
    const added = await confirmAdd({ eventId })

    if (added) {
      const { id: addedSpecimentId } = added
      router.replace(`/donnees/evenements/${eventId}`, { scroll: false })
      await wait(1000)

      // mutate(`/donnees/evenements/${eventId}`)

      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }

    //   const { id: addEventId } = added

      toaster.create({
        // title: 'Spécimen ajouté',
        title: `Le spécimen no ${addedSpecimentId} a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [eventId, cache, mutate, confirmAdd])

  return (
    <>
      {addSpecimenDialog}
      <ResponsiveButton label={'Ajouter'}  colorPalette={'green'} variant={'solid'} size={'sm'} icon={<RxPlus />} me={[2, null, 1]} onClick={handleAddSpecimen} />
    </>
  )
}

export default AddSpecimenButton