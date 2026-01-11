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

import AddAnalysisDialog from '.'

const AddAnalysisButton = ({ eventId }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: add, dialog: addSpecimenDialog } = useDialog(AddAnalysisDialog)

  const handleAddAnalysis = useCallback(async () => {
    const result = await add({ eventId })

    if (result) {
      router.replace(`/donnees/evenements/${eventId}`, { scroll: false })
      await wait(1000)

      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/analysis')) {
          mutate(key)
        }
      }

      toaster.create({
        title: `Le groupe d'analyse a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [eventId, cache, mutate, add])

  return (
    <>
      {addSpecimenDialog}
      <ResponsiveButton label={'Ajouter'}  colorPalette={'green'} variant={'solid'} size={'sm'} icon={<RxPlus />} me={[2, null, 1]} onClick={handleAddAnalysis} />
    </>
  )
}

export default AddAnalysisButton