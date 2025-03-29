'use client'
import { DateTime } from 'luxon'

import addAnalysis from './add-analysis.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import DiscoveryStateSelect from './discovery-state-select'

import addAnalysisSchema from './add-analysis-schema'

const defaultValues = {
  analysisId: null,
}
const AddAnalysisDialog = ({ close }) => {
  return (
    <BaseDialog title={'Ajout d\'une nouvelle analyse'} onClose={close} onSubmit={addAnalysis} schema={addAnalysisSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name={'analysisId'} label={'Analyse ou groupe d\'analyses :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddAnalysisDialog
