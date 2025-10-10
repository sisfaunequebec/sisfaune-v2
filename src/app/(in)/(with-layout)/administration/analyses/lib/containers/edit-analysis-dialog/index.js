'use client'
import { useState } from 'react'

// import { DateTime } from 'luxon'

// import editUSer from './action'

import { Fieldset, Input, Separator } from '@chakra-ui/react'
// import { RxCopy, RxCheckCircled } from 'react-icons/rx'

import BaseDialog from '@/app/lib/components/dialogs/base'

// import ControlledField from '@/app/lib/components/controlled-field'

// import addUserSchema from './schema'
// import { InputGroup } from '@/components/ui/input-group'

const EditAnalysisDialog = ({ close }) => {
  return (
    <BaseDialog title={'Modification d\'une analyse'} onClose={close} onSubmit={null} submitBtnLabel='Modifier' schema={null} defaultValues={null}>
      {(contentRef) => (
        <Fieldset.Root>
          {/* <Fieldset.Content gap={1}>
            <ControlledField name={'fullName'} label={'Nom complet :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'email'} label={'Adresse de courriel :'} variant={'horizontal'}>
              <Input autoComplete={'off'} type={'email'} />
            </ControlledField>
            <Separator />
            <ControlledField name={'password'} label={'Mot de passe :'} variant={'horizontal'} helperText={'IMPORTANT : ce mot de passe a été généré automatiquement et sera envoyé par courriel à l\'utilisateur: il ne sera plus visible par la suite. Il est recommandé de le copier si nécessaire avant de continuer...'}>
              <PasswordDisplay />
            </ControlledField>
          </Fieldset.Content> */}
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default EditAnalysisDialog
