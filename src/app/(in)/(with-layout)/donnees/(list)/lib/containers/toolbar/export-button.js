'use client'
import { useCallback } from 'react'

import { useQueryStates } from 'nuqs'
import { searchParams, urlKeys } from '@/lib/data/events/events-params'

import { saveAs } from 'file-saver'

import { RxDownload } from 'react-icons/rx'

import { exportEvents } from '@/lib/data/events/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from '../export-dialog'

const ExportButton = () => {
  const [filters] = useQueryStates(searchParams, { urlKeys })

  const { ask: confirmDownload, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleDownload = useCallback(async () => {
    const result = await confirmDownload({ filters, onExport: exportEvents })
    if (result) {
      // console.debug('Download', result)
      const { file, fileName, mimeType } = result
      const blob = new Blob([file], {type: `${mimeType}; charset=utf-8`})
      saveAs(blob, fileName)
    }
  }, [confirmDownload, filters])

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton label={'Exporter'} colorPalette={'blue'} icon={<RxDownload />} onClick={handleDownload} />
    </>
  )
}

export default ExportButton
