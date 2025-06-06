'use client'
import { useCallback } from 'react'

import { RxPlus } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import AddAnalysisDialog from '../containers/add-analysis-dialog'

const NewAnalysisButton = () => {
  const { ask: add, dialog } = useDialog(AddAnalysisDialog)

  const handleClick = useCallback(async () => {
    const result = await add()
    if (result) {
      console.debug('Create !!!')
    }
  }, [])

  return (
    <>
      {dialog}
      <ResponsiveButton label='Nouvelle analyse' colorPalette='blue' icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default NewAnalysisButton
