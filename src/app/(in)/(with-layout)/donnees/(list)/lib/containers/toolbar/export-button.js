'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import { useQueryStates } from 'nuqs'
import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

// import { saveAs } from 'file-saver'

import { RxDownload } from 'react-icons/rx'

import { startExtraction } from '@/lib/data/tasks/extraction/service'

import { toaster } from '@/app/lib/components/ui/toaster'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from './export-dialog'

const ExportButton = () => {
  const { mutate } = useSWRConfig()
  const [filters] = useQueryStates(searchParams, { urlKeys })

  const { ask: confirmDownload, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleExport = useCallback(async (params) => {
    const result = await startExtraction(params)

    const { data  } =  result
    const { id: taskId } = data

    toaster.create({
      id: taskId,
      title: 'Extraction en cours...' + taskId,
      description: 'Le téléchargement démarrera automatiquement lorsque l\'extraction sera terminée...',
      type: 'loading'
    })

    return result
  }, [])

  const handleDownload = useCallback(async () => {
    const result = await confirmDownload({ filters, onExport: handleExport })
  }, [confirmDownload, filters, handleExport])

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton label={'Extraction'} colorPalette={'blue'} icon={<RxDownload />} onClick={handleDownload} />
    </>
  )
}

export default ExportButton
