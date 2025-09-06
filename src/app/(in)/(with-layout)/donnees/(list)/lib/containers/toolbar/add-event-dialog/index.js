import { DateTime } from 'luxon'

import wait from '@/utils/wait'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'
import DateSelector from '@/app/lib/components/date-selector'

import ProgramSelect from './program-select'
import TypeSelect from './type-select'
import StatusSelect from './status-select'
import ReportOriginSelect from './report-origin-select'

import addEventSchema from './add-event-schema'

const defaultValues = {
  typeId: 0,
  programId: null,
  reportOriginId: null,
  statusId: 2,
  silabId: null,
  reportedAt: DateTime.utc().toJSDate()
}

const AddEventDialog = ({ close, programs, onAdd }) => {
  
  const handleSubmit = async (data) => {
    const added = await onAdd(data)
    await wait(300)
    close(added)
  }

  return (
    <BaseDialog title={'Nouvel événement'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={addEventSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name='typeId' label='Type :' variant='horizontal'>
              <TypeSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='statusId' label='Statut :' variant='horizontal'>
              <StatusSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='programId' label='Programme :' variant='horizontal'>
              <ProgramSelect programs={programs} contentRef={contentRef} />
            </ControlledField>
    
            <ControlledField name='reportOriginId' label='Provenance du signalement :' variant='horizontal'>
              <ReportOriginSelect contentRef={contentRef} />
            </ControlledField>
            <ControlledField name='reportedAt' label='Date du signalement :' variant='horizontal'>
              <DateSelector />
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
