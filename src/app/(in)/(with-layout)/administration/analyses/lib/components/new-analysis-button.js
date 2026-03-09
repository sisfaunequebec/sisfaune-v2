'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import newAnalysisAction from '../containers/new-analysis-dialog/new-analysis.action'
import NewAnalysisDialog from '../containers/new-analysis-dialog'

const NewAnalysisButton = () => {
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmAdd, dialog } = useDialog(NewAnalysisDialog)

  const handleClick = useCallback(async () => {
    const result = await confirmAdd({ onNew: newAnalysisAction })
    
    if (result) {
      await wait(1000)

      for (const key of cache.keys()) {
        if (key.includes('/api/admin/analyses')) {
          mutate(key)
        }
      }

      toaster.create({
        title: `L'analyse a été ajoutée avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [confirmAdd, mutate, cache])

  return (
    <>
      {dialog}
      <ResponsiveButton label={'Nouvelle analyse'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default NewAnalysisButton
