// import wait from '@/utils/wait'

import { Fieldset } from '@chakra-ui/react'

import exportDataSchema from './export.schema'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

// import FormatSelect from './format-select'
import AnalysisGroupMultiselect from './analysis-group-multiselect'

const defaultValues = {
  // format: { value: 'xlsx'}
}

const ExportDialog = ({ close, filters, onExport }) => {
  const handleSubmit = async (data) => {
    // const { format } = data
    // const { value } = format
    const { analysisGroupIds } = data
    const params = {...filters, ...{ analyse: analysisGroupIds ? analysisGroupIds.map(ag => ag.id) : undefined }}
    const result = await onExport(params)
    return result
  }

  return (
    <BaseDialog title={'Extraction des données'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Continuer'} defaultValues={defaultValues} schema={exportDataSchema} schemaType={'valibot'}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField name={'analysisGroupIds'} label={'Analyses à inclure :'} variant={'horizontal'}>
              <AnalysisGroupMultiselect contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ExportDialog
