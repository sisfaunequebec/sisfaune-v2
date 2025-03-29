'use client'
import { DateTime } from 'luxon'

import addSpecimen from './add-specimen.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import DiscoveryStateSelect from './discovery-state-select'

import addSpecimenSchema from './add-specimen-schema'

const defaultValues = {
  specieId: null,
  discoveryStateId: 0,
  silabIdentificationNumber: null,
  terrainIdentificationNumber: null,
  huntingPermitNumber: null
}
const AddSpecimenDialog = ({ close }) => {
  return (
    <BaseDialog title={'Ajout d\'un nouveau spécimen'} onClose={close} onSubmit={addSpecimen} schema={addSpecimenSchema} defaultValues={defaultValues}>
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
            {/* <ControlledField name={'typeId'} label={'Type :'} variant={'horizontal'}>
              <TypeSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name={'statusId'} label={'Statut :'} variant={'horizontal'}>
              <StatusSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name={'programId'} label={'Programme :'} variant={'horizontal'}>
              <ProgramSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name={'silabId'} label={'Numéro d\'identification SILAB :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'reportOriginId'} label={'Provenance du signalement :'} variant={'horizontal'}>
              <ReportOriginSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name={'reportedAt'} label={'Date du signalement :'} variant={'horizontal'}>
              <DateSelector />
            </ControlledField> */}
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddSpecimenDialog
