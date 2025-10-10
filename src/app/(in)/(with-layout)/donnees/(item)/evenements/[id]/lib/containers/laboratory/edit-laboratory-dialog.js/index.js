'use client'
import { useCallback } from 'react'

import updateLaboratory from '../update-laboratory.action'

import { Fieldset } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
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

const EditLaboratoryDialog = ({ close, eventId, data }) => {
 
  const handleSubmit = useCallback(async (data) => {
    await updateLaboratory(eventId, data)
    close()
  }, [close, eventId])

  const { labResponsible, labReceivedBy } = data

  return (
    <BaseDialog title={'Laboratoire'} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={editLaboratorySchema} schemaType={'valibot'} defaultValues={data}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={2}>
            <ControlledField label={'Responsable du dossier\u00A0:'} name={'labResponsible'} variant={'horizontal'}>
              <ResponsibleCombo contentRef={contentRef} />
            </ControlledField>
            <ControlledField label={'Spécimen(s) reçu(s) le\u00A0:'} name={'labReceivedAt'} variant={'horizontal'}>
              <DateInput contentRef={contentRef} clearable />
            </ControlledField>
            <ControlledField label={'Spécimen(s) reçu(s) par\u00A0:'} name={'labReceivedBy'} variant={'horizontal'}>
              <ReceivedByCombo contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default EditLaboratoryDialog
