'use client'
import { useCallback } from 'react'
// import { DateTime } from 'luxon'

// import addAnalysis from './action'

import { Fieldset, Input, Separator, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/app/lib/components/ui/radio'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

// import ResultTypeSelect from '../../components/result-type-select'
// import AnalysisGroupSelect from '../../components/analysis-group-select'
// import AnalysisSectorSelect from '../../components/analysis-sector-select'

import resetPasswordSchema from './reset-password-schema'

const defaultValues = {
  username: null
}

const ResetPasswordDialog = ({ close }) => {

  return (
    <BaseDialog title='Récupération du mot de passe' message={'Veuillez inscrire votre nom d\'utilisateur et cliquer sur "Envoyer" afin de recevoir un nouveau mot de passe temporaire par courriel :'} onClose={close} onSubmit={close} submitBtnLabel={'Envoyer'} schema={resetPasswordSchema} defaultValues={defaultValues}>
      {(contentRef, watched) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField label={'Nom d\'utilisateur :'} name='username' variant='vertical'>
              <Input autoComplete='off' />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ResetPasswordDialog
