import { useQueryStates } from 'nuqs'

import { useBreakpointValue } from '@chakra-ui/react'

import { searchParams, urlKeys } from '@/logic/data/events/events-params'

import exportDataSchema from './export.schema'
import exportData from './export.action'

import { Fieldset } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import FormatSelect from './format-select'

const defaultValues = {
  format: 'csv'
}

const ExportDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'md' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const [params] = useQueryStates(searchParams, { urlKeys })

  return (
    <BaseDialog title={'Exportation des événements ou spécimens'} onClose={close} onSubmit={exportData} submitBtnLabel={'Exporter'} schema={exportDataSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name={'format'} label={'Format :'} variant={'horizontal'}>
              <FormatSelect contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ExportDialog
