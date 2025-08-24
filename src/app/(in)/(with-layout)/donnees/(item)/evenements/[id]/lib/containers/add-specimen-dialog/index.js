'use client'
import { DateTime } from 'luxon'

import addSpecimenAction from './add-specimen.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import DiscoveryStateSelect from './discovery-state-select'

import addSpecimenSchema from './add-specimen-schema'
import { useCallback } from 'react'

const defaultValues = {
  specieId: null,
  discoveryStateId: null,
  silabIdentificationNumber: null,
  terrainIdentificationNumber: null,
  huntingPermitNumber: null
}
const AddSpecimenDialog = ({ eventId, close }) => {
  const handleSubmit = useCallback(async (data) => {
    const result = await addSpecimenAction(eventId, data)
    return result
  }, [eventId])

  return (
    <BaseDialog title={`Ajout d'un spécimen à l'événement ${eventId}`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={addSpecimenSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name={'specieId'} label={'Espèce :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'discoveryStateId'} label={'État lors de la découverte :'} variant={'horizontal'}>
              <DiscoveryStateSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name={'silabIdentificationNumber'} label={'Numéro de spécimen SILAB :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'terrainIdentificationNumber'} label={'Numéro d\'identif. sur le terrain :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'huntingPermitNumber'} label={'Numéro de permis de chasse :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddSpecimenDialog
