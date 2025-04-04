'use client'
import { useState } from 'react'

import { DateTime } from 'luxon'

import generator from 'generate-password'

import addUser from './action'

import { Fieldset, Input, Separator, IconButton, useClipboard } from '@chakra-ui/react'
import { RxCopy, RxCheck } from 'react-icons/rx'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import addUserSchema from './schema'
import { InputGroup } from '@/components/ui/input-group'

const CopyPasswordButton = ({ password }) => {
  const clipboard = useClipboard({ value: password })
  const { copy, copied } = clipboard
  return (
    <IconButton variant={'ghost'} size={'xxs'} rounded={'full'} onClick={copy}>
      { copied ? <RxCheck /> : <RxCopy /> }
    </IconButton>
  )
}

const PasswordDisplay= ({ value }) => {
  return (
    <InputGroup endElement={<CopyPasswordButton password={value} />} w={'100%'}>
      <Input autoComplete={'off'} value={value} readOnly />
    </InputGroup>
  )
}

const AddUserDialog = ({ close }) => {
  const [password, setPassword] = useState(generator.generate({ length: 10, numbers: true, excludeSimilarCharacters: true, strict: true }))
  const defaultValues = {
    fullName: null,
    email: null,
    password
  }

  return (
    <BaseDialog title={'Nouvel utilisateur'} onClose={close} onSubmit={addUser} submitBtnLabel={'Inscrire'} schema={addUserSchema} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name={'fullName'} label={'Nom complet :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'email'} label={'Adresse courriel :'} variant={'horizontal'}>
              <Input autoComplete={'off'} type={'email'} />
            </ControlledField>
            <Separator />
            <ControlledField name={'password'} label={'Mot de passe :'} variant={'horizontal'} helperText={'Ceci est le mot de passe généré qui sera envoyé par courriel au participant: il est recommandé de le copier avant de cliquer sur Inscrire'}>
              <PasswordDisplay />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddUserDialog
