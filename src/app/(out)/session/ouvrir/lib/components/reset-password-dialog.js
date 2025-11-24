'use client'

import wait from '@/utils/wait'
import noop from '@/utils/noop'

import resetPassword from './reset-password.action'

import { Fieldset, Input } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

import TextInput from '@/app/lib/components/inputs/base/text'

import resetPasswordSchema from './reset-password-schema'

const defaultValues = {
  username: null
}

const ResetPasswordDialog = ({ close }) => {

  const handleSubmit = async (data) => {
    const newPassword = await resetPassword(data)

    console.debug(newPassword)

    await wait(1000)

    toaster.create({
      title: 'Nouveau mot de passe',
      description: `Un nouveau mot de passe vous a été envoyé\u00A0: veuillez consulter votre boîte réception...`,
      type: 'success',
      duration: 3000
    })
  }

  return (
    <BaseDialog size={'sm'} title={'Mot de passe oublié ?'} message={'Veuillez inscrire votre nom d\'utilisateur et cliquer sur "Envoyer" afin de recevoir un nouveau mot de passe par courriel :'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Envoyer'} schema={resetPasswordSchema} defaultValues={defaultValues}>
      {(contentRef, watched) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField label={'Nom d\'utilisateur :'} name={'username'} variant={'vertical'}>
              <Input autoComplete={'off'} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ResetPasswordDialog
