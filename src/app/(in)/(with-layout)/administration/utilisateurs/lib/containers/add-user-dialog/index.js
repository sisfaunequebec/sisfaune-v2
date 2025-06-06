'use client'
import { useState } from 'react'

// import { DateTime } from 'luxon'
import generatePassword from '@/lib/data/users/generate-password'

import addUser from './action'

import { Fieldset, Input, Button, Separator, IconButton, useClipboard } from '@chakra-ui/react'
import { RxCopy, RxCheckCircled, RxCheck } from 'react-icons/rx'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import addUserSchema from './schema'
import { InputGroup } from '@/app/lib/components/ui/input-group'

const CopyPasswordButton = ({ password }) => {
  const clipboard = useClipboard({ value: password })
  const { copy, copied } = clipboard
  return (
    <Button variant={'ghost'} size={'xxs'} rounded='full' onClick={copy} fontWeight={'normal'} color={copied && 'green'}>
      {copied ? <>Copié{'\u00A0'}!</> : <RxCopy />}
    </Button>
  )
}

const PasswordDisplay = ({ value }) => {
  return (
    <InputGroup endElement={<CopyPasswordButton password={value} />} w='100%'>
      <Input autoComplete='off' value={value} readOnly />
    </InputGroup>
  )
}

const AddUserDialog = ({ close }) => {
  const [password, setPassword] = useState(generatePassword())
  const defaultValues = {
    fullName: null,
    email: null,
    password
  }

  return (
    <BaseDialog title='Nouvel utilisateur' onClose={close} onSubmit={addUser} submitBtnLabel='Inscrire' schema={addUserSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name='fullName' label='Nom complet :' variant='horizontal'>
              <Input autoComplete='off' />
            </ControlledField>
            <ControlledField name='email' label='Adresse de courriel :' variant='horizontal'>
              <Input autoComplete='off' type='email' />
            </ControlledField>
            <Separator />
            <ControlledField name='password' label='Mot de passe :' variant='horizontal' helperText={'IMPORTANT : ce mot de passe a été généré automatiquement et sera envoyé par courriel à l\'utilisateur: il ne sera plus visible par la suite. Il est recommandé de le copier si nécessaire avant de continuer...'}>
              <PasswordDisplay />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddUserDialog
