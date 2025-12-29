import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

// import { IconButton } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import { RxTrash } from 'react-icons/rx'

import { deleteAnalysis } from '@/lib/data/analyses/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import DeleteAnalysisDialog from './delete-analysis-group-dialog'

const DeleteAnalysisButton = ({ analysisGroup }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmDelete, dialog: deleteAnalysisDialog } = useDialog(DeleteAnalysisDialog)

  const handleDeleteAnalysis = useCallback(async () => {
    const result = await confirmDelete({ analysisGroup, onDelete: deleteAnalysis })

    if (result) {
      router.refresh()

      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }

      toaster.create({
        title: `Le groupe d'analyses a été effacé avec succès...`,
        type: 'success',
        duration: 3000
    })
    }
  }, [confirmDelete, analysisGroup, router, mutate, cache])

  return (
    <>
      {deleteAnalysisDialog}
      <ResponsiveButton colorPalette={'red'} variant={'subtle'} size={'sm'} label={'Effacer'} icon={<RxTrash />} me={[2, null, 1]} onClick={handleDeleteAnalysis} />
    </>
  )
}

export default DeleteAnalysisButton
