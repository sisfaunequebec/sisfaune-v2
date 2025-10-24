import { DateTime } from 'luxon'

import wait from '@/utils/wait'

import { Fieldset, Input } from '@chakra-ui/react'

import { DEFAULT_FORMAT } from '@/utils/dates'
// import { isoDateToDb } from '@/lib/data/transformers/utils'
import { eventTransformer } from '@/lib/data/transformers/event'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
import DateInput from '@/app/lib/components/inputs/base/date'

import ProgramSelect from '@/app/lib/components/inputs/program-select'
import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'

import addEventSchema from './add-event-schema'

const defaultValues = {
  typeId: 0,
  programId: null,
  reportOriginId: null,
  statusId: 2,
  silabId: null,
  reportedAt: DateTime.utc().toFormat(DEFAULT_FORMAT)
}

const AddEventDialog = ({ close, programs, onAdd }) => {
  const handleSubmit = async (data) => {
    const transformed = eventTransformer(data, {}, 'toDB')
    const added = await onAdd(transformed)
    await wait(300)
    close(added)
  }

  return (
    <BaseDialog title={'Nouvel événement'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={addEventSchema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={2}>
            <ControlledField name='typeId' label='Type :' variant='horizontal'>
              <EventTypeSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='statusId' label='Statut :' variant='horizontal'>
              <EventStatusSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='programId' label='Programme :' variant='horizontal'>
              <ProgramSelect programs={programs} contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='reportOriginId' label='Provenance du signalement :' variant='horizontal'>
              <ReportOriginSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='reportedAt' label='Date du signalement :' variant='horizontal'>
              <DateInput />
            </ControlledField>
            <ControlledField name='silabId' label={'Numéro d\'identification SILAB :'} variant='horizontal'>
              <Input autoComplete='off' />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddEventDialog
