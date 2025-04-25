'use client'
import { DateTime } from 'luxon'

import submit from './submit.action'

import { Fieldset, Input, Separator, Stack } from '@chakra-ui/react'
import { PasswordInput, PasswordStrengthMeter } from '@/app/lib/components/ui/password-input'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import schema from './schema'

const UserParametersDialog = ({ user, close }) => {
  const { email } = user

  const defaultValues = {
    email
  }

  return (
    <BaseDialog title='Vos paramètres' onClose={close} onSubmit={submit} submitBtnLabel='Sauvegarder' schema={schema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name='email' label='Adresse de courriel :' variant='horizontal'>
              <Input autoComplete='off' type='email' />
            </ControlledField>
            <Separator />
            <Fieldset.Legend mb={2}>Modification du mot de passe</Fieldset.Legend>
            <ControlledField name='password' label='Mot de passe actuel :' variant='horizontal'>
              <PasswordInput autoComplete='off' type='password' />
            </ControlledField>
            <Stack alignItems='stretch'>
              <ControlledField name='newPassword' label='Nouveau mot de passe :' variant='horizontal'>
                <PasswordInput autoComplete='off' type='password' />
              </ControlledField>
              {/* <PasswordStrengthMeter value={2} /> */}
            </Stack>
            <ControlledField name='confirmation' label='Confirmation :' variant='horizontal'>
              <PasswordInput autoComplete='off' type='password' />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default UserParametersDialog
