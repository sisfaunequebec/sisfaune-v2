'use client'
import { DateTime } from 'luxon'

import addAnalysis from './action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

import addAnalysisSchema from './schema'

const defaultValues = {
  // typeId: 0,
  // programId: null,
  // reportOriginId: 1,
  // statusId: 2,
  // silabId: null,
  // reportedAt: DateTime.utc().toJSDate()
}

const AddAnalysisDialog = ({ close }) => {
  return (
    <BaseDialog title='Nouvelle analyse' onClose={close} onSubmit={addAnalysis} submitBtnLabel='Ajouter' schema={addAnalysisSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
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
            </ControlledField>/
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

export default AddAnalysisDialog
