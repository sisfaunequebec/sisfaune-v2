'use client'
import { DateTime } from 'luxon'

import submit from './submit.action'

import { Fieldset, Input, Separator } from '@chakra-ui/react'
import { PasswordInput } from '@/app/lib/components/ui/password-input'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'
import TextField from '../../../donnees/(item)/evenements/[id]/lib/components/text-field'

import schema from './schema'

const UserParametersDialog = ({ user, close }) => {
  const { email } = user

  const defaultValues = {
    email
  }

  return (
    <BaseDialog title='Vos paramètres' onClose={close} onSubmit={submit} submitBtnLabel='Sauvegarder' schema={schema} defaultValues={defaultValues} watches={['password', 'newPassword']}>
      {(contentRef, watched) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField name='email' label='Adresse de courriel :' variant='horizontal'>
              <TextField autoComplete='off' type='email' readOnly={true} />
            </ControlledField>
            <Separator />
            <Fieldset.Legend mb={2}>Modification du mot de passe</Fieldset.Legend>
            <ControlledField name='password' label='Mot de passe actuel :' variant='horizontal'>
              <PasswordInput autoComplete='off' type='password' />
            </ControlledField>
            <ControlledField name='newPassword' label='Nouveau mot de passe :' variant='horizontal' disabled={!watched.password}>
              <PasswordInput autoComplete='off' type='password' />
            </ControlledField>
            <ControlledField name='confirmation' label='Confirmation :' variant='horizontal' disabled={!watched.newPassword}>
              <PasswordInput autoComplete='off' type='password' />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default UserParametersDialog
