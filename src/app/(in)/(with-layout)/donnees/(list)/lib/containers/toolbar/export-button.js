'use client'
import { useState, useCallback } from 'react'

import { useSWRConfig } from 'swr'

import { useQueryStates } from 'nuqs'
import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import { saveAs } from 'file-saver'
// import { ProgressCircle } from '@chakra-ui/react'
import { RxDownload } from 'react-icons/rx'

import { startExtraction } from '@/lib/data/tasks/extraction/service'

import { toaster } from '@/app/lib/components/ui/toaster'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import ExportDialog from './export-dialog'

// const CircularProgress = ({value = 0}) => {
//   return (
//     <ProgressCircle.Root value={value}>
//       <ProgressCircle.Circle>
//         <ProgressCircle.Track />
//         <ProgressCircle.Range />
//       </ProgressCircle.Circle>
//       {/* <ProgressCircle.ValueText /> */}
//     </ProgressCircle.Root>
//   )
// }

const ExportButton = () => {
  // const { mutate } = useSWRConfig()
  const [status, setStatus] = useState(null)
  const [progress, setProgress] = useState(0)

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

  const handleDownloadOld = useCallback(async () => {
    const result = await confirmDownload({ filters, onExport: handleExport })
  }, [confirmDownload, filters, handleExport])

  const handleDownload = useCallback(async () => {
    setProgress(Math.round(1))

    const response = await fetch('/api/workflow/extraction', { method: 'POST', body: JSON.stringify({ prompt: 'Hi' }) })
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const decoded = decoder.decode(value)
      console.debug(decoded)

      const parsed = JSON.parse(decoded)
      const { progress, result } = parsed
      
      if (result) {
         console.debug(result)
        const { filename, url } = result
        saveAs(url, filename)
        // setProgress(100)
      }
      setProgress(progress)
    }
  }, [setProgress])

  // const isLoading = (progress > 0 && progress < 100)

  return (
    <>
      {downloadEventsDialog}
      <ResponsiveButton 
        label={'Extraction'} 
        colorPalette={'blue'} 
        icon={<RxDownload />} 
        // loading={isLoading}
        // loadingText={'Extraction'}
        onClick={handleDownloadOld} />
    </>
  )
}

export default ExportButton
