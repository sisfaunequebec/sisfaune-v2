'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import updateAccountParametersAction from './update-account-parameters.action'

import { PasswordInput } from '@/app/lib/components/ui/password-input'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import schema from './schema'

const watchedFields = []

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Adresse de courriel\u00A0:', name: 'email' },
      { label: 'Nouveau mot de passe\u00A0:', name: 'password', component: PasswordInput, props: { autoComplete: 'new-password' } },
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
      }
    </BaseDialog>
  )
}

export default AccountParametersDialog
