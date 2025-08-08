'use client'
import { useCallback } from 'react'

import { DateTime } from 'luxon'

import updateLaboratory from '../update-laboratory.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'
import DateSelector from '@/app/lib/components/date-selector'

import editLaboratorySchema from './edit-laboratory.schema'

const EditLaboratoryDialog = ({ close, eventId, laboratoryData }) => {
  console.debug(eventId, laboratoryData)

  const handleSubmit = useCallback(async (data) => {
    await updateLaboratory(eventId, data)
    close()
  }, [close, eventId])

  return (
    <BaseDialog title={'Laboratoire'} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={editLaboratorySchema} schemaType={'valibot'} defaultValues={laboratoryData}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField label={'Spécimen(s) reçu(s) le\u00A0:'} name={'labReceivedAt'} variant={'horizontal'}>
              <DateSelector contentRef={contentRef} clearable />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default EditLaboratoryDialog
