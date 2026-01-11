'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import updateAccountParametersAction from './update-account-parameters.action'

import { Fieldset, Separator } from '@chakra-ui/react'
import { PasswordInput } from '@/app/lib/components/ui/password-input'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

// import ControlledField from '@/app/lib/components/controlled-field'
import TextInput from '@/app/lib/components/inputs/base/text'

import schema from './schema'

const watchedFields = []

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Votre adresse de courriel\u00A0:', name: 'email' },
      { label: 'Votre nouveau mot de passe\u00A0:', name: 'password', component: PasswordInput }
    ]
  }
]

const AccountParametersDialog = ({ close, account }) => {
  const router = useRouter()
  const { id: userId } = account

  const handleSubmit = useCallback(async (data) => {
    const result = await updateAccountParametersAction(userId, data)
    router.refresh()
    return result
  }, [userId, router])

  const fieldNames = formSchema.map(section => {
    const { fields } = section
    return fields
  }).flat().map(field => field.name)
  
  const defaultValues = fieldNames.reduce((acc, name) => {
    const value = account[name]
    acc[name] = value
    return acc
  }, {})

  return (
    <BaseDialog title={'Vos paramètres'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues} watches={watchedFields}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={account} />
        )}
        // <Fieldset.Root>
        //   <Fieldset.Content gap={1}>
        //     {/* <ControlledField name='email' label='Adresse de courriel :' variant='horizontal'>
        //       <TextField autoComplete='off' type='email' readOnly={true} />
        //     </ControlledField> */}
        //     <Separator />
        //     <Fieldset.Legend mb={2}>Modification du mot de passe</Fieldset.Legend>
        //     <ControlledField name='password' label='Mot de passe actuel :' variant='horizontal'>
        //       <PasswordInput autoComplete='off' type='password' />
        //     </ControlledField>
        //     <ControlledField name='newPassword' label='Nouveau mot de passe :' variant='horizontal' disabled={!watched.password}>
        //       <PasswordInput autoComplete='off' type='password' />
        //     </ControlledField>
        //     <ControlledField name='confirmation' label='Confirmation :' variant='horizontal' disabled={!watched.newPassword}>
        //       <PasswordInput autoComplete='off' type='password' />
        //     </ControlledField>
        //   </Fieldset.Content>
        // </Fieldset.Root>
      }
    </BaseDialog>
  )
}

export default AccountParametersDialog
