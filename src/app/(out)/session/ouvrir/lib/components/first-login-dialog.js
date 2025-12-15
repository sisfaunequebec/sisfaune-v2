'use client'

import wait from '@/utils/wait'
import noop from '@/utils/noop'

import resetPassword from './reset-password.action'

import { Fieldset, Input } from '@chakra-ui/react'
import { toaster } from '@/app/lib/components/ui/toaster'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

import schema from './first-login-schema'

const defaultValues = {
  email: undefined
}

const firstLoginDialog = ({ close }) => {

  const handleSubmit = async (data) => {
    const result = await resetPassword(data)
    const { data: payload, errors } = result

    if (payload) {
      const { email, newPassword } = payload
      console.debug(newPassword)
      
      await wait(1000)

      toaster.create({
        title: 'Nouveau mot de passe',
        description: `Un nouveau mot de passe a été envoyé\u00A0: veuillez consulter votre boîte réception...`,
        type: 'success',
        duration: 3000
      })
    }

    return result
  }

  return (
    <BaseDialog size={'sm'} title={'Première connexion sur SIS Faune v2 ?'} message={'Veuillez inscrire l\'adresse de courriel que vous utilisez pour SIS-Faune et cliquer sur "Envoyer" afin de recevoir un nouveau mot de passe par courriel :'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Envoyer'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField label={'Votre adresse de courriel :'} name={'email'} variant={'vertical'} type={'email'}>
              <Input autoComplete={'off'} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default firstLoginDialog
