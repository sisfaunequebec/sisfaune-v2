'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import validateEmailAction from './validate-email.action'

import { Alert } from '@chakra-ui/react'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import schema from './schema'

const watchedFields = []

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Adresse de courriel\u00A0:', name: 'email' }
    ]
  }
]

const FirstLoginDialog = ({ close, account }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const { id: userId } = account

  const handleSubmit = useCallback(async (data) => {
    const result = await validateEmailAction(userId, data)
    mutate('/api/auth/user')
    // router.refresh()
    return result
  }, [userId])

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
    <BaseDialog 
      title={'Première connexion sur SIS Faune v2 ?'}
      // message={'Nous devons valider votre adresse de courriel et vous faire parvenir un nouveau mot de passe : veuillez saisir les informations demandées ci-dessous et cliquer sur "Envoyer".'}
      onSubmit={handleSubmit} submitBtnLabel={'Envoyer'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues} watches={watchedFields}
    >
      {(contentRef, watched) => {
        return (
          <>
          <Alert.Root status={'warning'} mb={4}>
            <Alert.Indicator />
            <Alert.Content>
              {/* <Alert.Title><strong>IMPORTANT</strong></Alert.Title> */}
              <Alert.Description>
                Nous devons valider votre adresse de courriel et vous faire parvenir un nouveau mot de passe : veuillez saisir les informations demandées ci-dessous et cliquer sur &quot;Envoyer&quot;
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={account} />
          </>
        )}
      }
    </BaseDialog>
  )
}

export default FirstLoginDialog
