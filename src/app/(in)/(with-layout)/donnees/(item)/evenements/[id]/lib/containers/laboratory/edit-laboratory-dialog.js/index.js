'use client'
import { useCallback } from 'react'

import updateLaboratoryAction from '../update-laboratory.action'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import DateInput from '@/app/lib/components/inputs/base/date'
import Autocomplete from '../../../components/autocomplete'

import editLaboratorySchema from './edit-laboratory.schema'

const ReceivedByCombo = ({ value, onChange }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/lab-receivers?t=${inputValue}`)
    const data = await response.json()
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [[item?.label].join(' ')]
  }, [])

  const labelKey = useCallback(item => [item?.label].join(' '), [])

  return (
    <Autocomplete value={value} valueKey={'id'} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} allowCustomValue={true} />
  )
}

const ResponsibleCombo = ({ value, onChange }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/lab-responsibles?t=${inputValue}`)
    const data = await response.json()
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [[item?.firstName, item?.lastName].join(' '), [item?.organisation].join(' ')]
  }, [])

  const labelKey = useCallback(item => [item?.firstName, item?.lastName].join(' '), [])

  return (
    <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} />
  )
}

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Responsable du dossier\u00A0:', name: 'labResponsible', component: ResponsibleCombo },
      { label: 'Spécimen(s) reçu(s) le\u00A0:', name: 'labReceivedAt', component: DateInput },
      { label: 'Spécimen(s) reçu(s) par\u00A0:', name: 'labReceivedBy', component: ReceivedByCombo }
    ]
  }
]

const EditLaboratoryDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (data) => {
    const { labResponsible, labReceivedBy, ...rest } = data

    const payload = {
      ...rest,
      labResponsibleId: labResponsible?.id ?? null,
      labReceivedBy: labReceivedBy?.id ?? null
    }

    await updateLaboratoryAction(eventId, payload)
    close()
  }, [close, eventId])

  return (
    <BaseDialog title={'Laboratoire'} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={editLaboratorySchema} schemaType={'valibot'} defaultValues={data}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={data} />
        )}
      }
    </BaseDialog>
  )
}

export default EditLaboratoryDialog
