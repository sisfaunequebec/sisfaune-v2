'use client'
import { useState, useCallback } from 'react'

import { useSWRConfig } from 'swr'

import { useQueryStates } from 'nuqs'
import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import { saveAs } from 'file-saver'

import { RxDownload } from 'react-icons/rx'

import useSpecimensCount from '@/lib/data/specimens/use-specimens-count'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from './export-dialog'

const ExportButton = () => {
  const [status, setStatus] = useState(null)
  const [progress, setProgress] = useState(0)

  const [filters] = useQueryStates(searchParams, { urlKeys })

  const { data: specimensCount } = useSpecimensCount(filters)
  console.debug('ExportButton - specimensCount:', specimensCount)

  const { ask: confirmDownload, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleDownload = useCallback(async () => {
    const result = await confirmDownload({ filters })
  }, [confirmDownload, filters])

  const isDisabled = specimensCount < 1

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton 
        label={'Extraction'} 
        colorPalette={'blue'} 
        icon={<RxDownload />} 
        disabled={isDisabled}
        onClick={handleDownload} 
      />
    </>
  )
}

export default ExportButton
