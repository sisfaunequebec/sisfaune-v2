import { DateTime } from 'luxon'

import wait from '@/utils/wait'

import { Fieldset, Input } from '@chakra-ui/react'

import { DEFAULT_FORMAT } from '@/utils/dates'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
import DateInput from '@/app/lib/components/inputs/base/date'

import ProgramSelect from '@/app/lib/components/inputs/program-select'
import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'
import { isoDateToDb } from '@/lib/data/transformers/utils'

import schema from './add-event-schema'

const defaultValues = {
  type: { id: 0 },
  program: null,
  reportOrigin: null,
  status: { id: 2 },
  silabId: null,
  reportedAt: DateTime.utc().toFormat(DEFAULT_FORMAT)
}

const AddEventDialog = ({ close, programs, onAdd }) => {
  const handleSubmit = async (data) => {
    const { type, status, reportOrigin, program, reportedAt, ...rest } = data

    const payload = {
      typeId: type?.id ?? undefined,
      programId: program?.id ?? null,
      reportOriginId: reportOrigin?.id ?? null,
      statusId: status?.id ?? null,
      reportedAt: reportedAt ? isoDateToDb(reportedAt) : null,
      closedAt: status?.id === 3 ? DateTime.utc().toISO() : null,
      ...rest
    }

    const result = await onAdd(payload)
    await wait(300)

    return result 
  }

  return (
    <BaseDialog title={'Nouvel événement'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={2}>
            <ControlledField name='type' label='Type :' variant='horizontal'>
              <EventTypeSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='status' label='Statut :' variant='horizontal'>
              <EventStatusSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='program' label='Programme :' variant='horizontal'>
              <ProgramSelect programs={programs} contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='reportOrigin' label='Provenance du signalement :' variant='horizontal'>
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
