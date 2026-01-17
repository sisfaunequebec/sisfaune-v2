'use client'
import { useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddUserDialog from '../containers/add-user-dialog'
import addUserAction from '../containers/add-user-dialog/add-user.action'

const AddUserButton = () => {
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmAdd, dialog } = useDialog(AddUserDialog)

  const handleClick = useCallback(async () => {
    const result = await confirmAdd({ onAdd: addUserAction })
    
    if (result) {
      await wait(1000)

      for (const key of cache.keys()) {
        if (key.includes('/api/admin/users')) {
          mutate(key)
        }
      }

      toaster.create({
        title: `L'utilisateur a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [confirmAdd, mutate, cache])

  return (
    <>
      {dialog}
      <ResponsiveButton label={'Nouvel utilisateur'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default AddUserButton
