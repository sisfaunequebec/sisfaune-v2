'use client'
import { DateTime } from 'luxon'

// import addAnalysis from './add-analysis.action'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/base-dialog'

// import ControlledField from '@/app/lib/components/controlled-field'

// import DiscoveryStateSelect from './discovery-state-select'

// import addAnalysisSchema from './add-analysis-schema'

import LaboratoryFormContent from '../laboratory-form-content'

const defaultValues = {
  // analysisId: null
}
const EditLaboratoryDialog = ({ close }) => {
  return (
    <BaseDialog title={'Laboratoire'} size={'lg'} onClose={close} onSubmit={null} submitBtnLabel={'Sauvegarder'} schema={null} defaultValues={null}>
      {(contentRef) => (
        <Fieldset.Root>
          <LaboratoryFormContent isEditing={true} />
          {/* <Fieldset.Content gap={3}> */}
            {/* <ControlledField name='analysisId' label={'Analyse ou groupe d\'analyses :'} variant='horizontal'>
              <Input autoComplete='off' />
            </ControlledField> */}
          {/* </Fieldset.Content> */}
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default EditLaboratoryDialog
