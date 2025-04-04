
'use client'
import { useCallback } from 'react'

import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utilitaires/use-dialog'

import ResponsiveButton from '@/components/responsive-button'

import AddUserDialog from '../containers/add-user-dialog'

const NewUserButton = () => {
  const { ask: add, dialog } = useDialog(AddUserDialog)

  const handleClick = useCallback(async () => {
    const result = await add()
    if (result) {
      console.debug('Create !!!')
    }
  }, [])

  return (
    <>
      {dialog}
      <ResponsiveButton label={'Nouvel utilisateur'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default NewUserButton