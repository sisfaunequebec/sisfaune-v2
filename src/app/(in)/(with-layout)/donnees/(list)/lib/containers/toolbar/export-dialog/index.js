import wait from '@/utils/wait'

import { Fieldset } from '@chakra-ui/react'

import exportDataSchema from './export.schema'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

import FormatSelect from './format-select'

const defaultValues = {
  format: 'xlsx'
}

const ExportDialog = ({ close, filters, onExport }) => {

  const handleSubmit = async (data) => {
    const allParams = {...filters, ...data}
    const result = await onExport(allParams)
    await wait(1500)
    close(result)
  }

  return (
    <BaseDialog title={'Exportation des événements ou spécimens'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Exporter'} schema={exportDataSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField name={'format'} label={'Format d\'exportation :'} variant={'horizontal'}>
              <FormatSelect contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ExportDialog
