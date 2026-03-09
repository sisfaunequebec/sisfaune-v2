'use client'
import { useCallback } from 'react'

import { useQueryStates } from 'nuqs'
import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import { saveAs } from 'file-saver'

import { RxDownload } from 'react-icons/rx'

import { exportEvents } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from './export-dialog'

const ExportButton = () => {
  const [filters] = useQueryStates(searchParams, { urlKeys })

  const { ask: confirmDownload, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleExport = useCallback(async (params) => {
    const result = await exportEvents(params)
    if (result) {
      const { file, fileName, mimeType } = result
      const blob = new Blob([file], {type: `${mimeType}; charset=utf-8`})
      saveAs(blob, fileName)
    }
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
