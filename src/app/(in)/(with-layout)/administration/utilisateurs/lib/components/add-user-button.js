'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import { toaster } from '@/app/lib/components/ui/toaster'
import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddUserDialog from '../containers/add-user-dialog'

const AddUserButton = () => {
  const { ask: add, dialog } = useDialog(AddUserDialog)

  const handleClick = useCallback(async () => {
    const result = await add()
    if (result) {
      toaster.create({
        title: `L'utilisateur a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [add])

  return (
    <>
      {dialog}
      <ResponsiveButton label={'Nouvel utilisateur'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default AddUserButton
