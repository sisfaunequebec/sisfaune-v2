'use client'
import { useCallback } from 'react'

import { RxPlus, RxDownload, RxMagnifyingGlass } from 'react-icons/rx'

import useDialog from '@/utilitaires/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from '../export-dialog'

const ExportButton = () => {
  const { ask: downloadEvents, dialog: downloadEventsDialog } = useDialog(ExportDialog)

  const handleDownload = useCallback(async () => {
    const result = await downloadEvents()
    if (result) {
      console.debug('Download !!!')
    }
  }, [downloadEvents])

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton label={'Exporter'} colorPalette={'blue'} icon={<RxDownload />} onClick={handleDownload} />
    </>
  )
}

export default ExportButton
