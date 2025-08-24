import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

// import { IconButton } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import { RxTrash } from 'react-icons/rx'

import { deleteSpecimen } from '@/lib/data/specimens/service'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import DeleteSpecimenDialog from './delete-specimen-dialog'

const DeleteSpecimenButton = ({ specimenId }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmDelete, dialog: deleteSpecimenDialog } = useDialog(DeleteSpecimenDialog)

  const handleDeleteSpecimen = useCallback(async () => {
    await confirmDelete({ specimenId, onDelete: deleteSpecimen })

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
      title: 'Spécimen effacé',
      description: `Le spécimen no ${specimenId} a été effacé avec succès...`,
      type: 'success',
      duration: 6000
    })

  }, [confirmDelete, specimenId, router, mutate, cache])

  return (
    <>
      {deleteSpecimenDialog}
      <ResponsiveButton colorPalette={'red'} variant={'subtle'} size={'sm'} label={'Effacer'} icon={<RxTrash />} me={[2, null, 1]} onClick={handleDeleteSpecimen} />
      {/* <IconButton colorPalette={'red'} variant={'solid'} rounded={'full'} size={'xs'} onClick={handleDeleteSpecimen}><RxTrash /></IconButton> */}
    </>
  )
}

export default DeleteSpecimenButton
