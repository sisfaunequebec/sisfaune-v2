'use client'
import { useCallback } from 'react'

import { DateTime } from 'luxon'

import addSpecimenAction from './add-specimen.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
import Autocomplete from '@/app/lib/components/inputs/autocomplete'

import DiscoveryStateSelect from '../../components/discovery-state-select'

import addSpecimenSchema from './add-specimen-schema'

const SpeciesCombo = ({ value, onChange, ...rest }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/animal-species?t=${inputValue}`)
    const data = await response.json()
    // console.debug(data)
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [item?.name, item?.binome]
  }, [])

  const labelKey = useCallback(item => item?.name, [])

  return (
    <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} {...rest} />
  )
}

const defaultValues = {
  specie: null,
  discoveryState: { id: 0 },
  silabIdentificationNumber: null,
  terrainIdentificationNumber: null,
  huntingPermitNumber: null
}
const AddSpecimenDialog = ({ eventId, close }) => {
  const handleSubmit = useCallback(async (data) => {
    const { specie, discoveryState,  ...rest } = data
    const payload = {
      specieId: specie?.id ?? undefined,
      discoveryStateId: discoveryState?.id ?? undefined,
      ...rest
    }
    const result = await addSpecimenAction(eventId, payload)
    return result
  }, [eventId])

  return (
    <BaseDialog title={`Ajout d'un spécimen à l'événement no ${eventId}`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={addSpecimenSchema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={2}>
            <ControlledField name={'specie'} label={'Espèce :'} variant={'horizontal'}>
              <SpeciesCombo contentRef={contentRef}  />
            </ControlledField>
            <ControlledField name={'discoveryState'} label={'État lors de la découverte :'} variant={'horizontal'}>
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

export  { SpeciesCombo }
