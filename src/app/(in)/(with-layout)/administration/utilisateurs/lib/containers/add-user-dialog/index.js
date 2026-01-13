'use client'
import { useState, useCallback } from 'react'

import generatePassword from '@/lib/data/users/generate-password'

import addUserAction from './add-user.action'

import { Text, Button, useClipboard, VStack } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'

import { RxCopy } from 'react-icons/rx'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import TextInput from '@/app/lib/components/inputs/base/text'

import schema from './schema'

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
    <VStack>
      <InputGroup endElement={<CopyPasswordButton password={value} />} w='100%'>
        <TextInput autoComplete={'off'} value={value} readOnly />
      </InputGroup>
      <Text color={'gray.600'} lineHeight={'shorter'}>IMPORTANT : ce mot de passe a été généré automatiquement et sera envoyé par courriel à l&apos;utilisateur: il ne sera plus visible par la suite. Il est recommandé de le copier si nécessaire avant de continuer...</Text>
    </VStack>
  )
}

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Prénom\u00A0:', name: 'firstName' },
      { label: 'Nom de famille\u00A0:', name: 'lastName' },
      { label: 'Adresse de courriel\u00A0:', name: 'email' }
    ]
  },
    { 
    title: null,
    fields: [
      { label: 'Nouveau mot de passe\u00A0:', name: 'password', component: PasswordDisplay }
    ]
  }
]

const AddUserDialog = ({ close }) => {
  // const [password, setPassword] = useState()

  const defaultValues = {
    firstName: null,
    lastName: null,
    email: null,
    password: generatePassword()
  }

  const handleSubmit = useCallback(async (data) => {
    const result = await addUserAction(data)
    return result
  }, [])

  return (
    <BaseDialog title={'Nouvel utilisateur'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} data={null} />
        )}
      }
    </BaseDialog>
  )
}

export default AddUserDialog
