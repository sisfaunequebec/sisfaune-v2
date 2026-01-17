'use client'
import { useState, useEffect, useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import getUserAction from './get-user.action'
import updateUserAction from './update-user.action'

import { Checkbox as ChakraCheckbox } from "@chakra-ui/react"

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import TextDisplay from '@/app/lib/components/display/base/text'

const Checkbox = ({ label, value, onChange, ...rest }) => {
  const handleSubmit = useCallback(() => {
    onChange(!value)
  }, [onChange, value])
  return (
    <ChakraCheckbox.Root
        checked={value}
        onCheckedChange={(e) => handleSubmit(value)}
        {...rest}>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  )
}

const formSchema = [
  { 
    title: 'Identification',
    fields: [
      // { label: 'Id\u00A0:', name: 'id', component: TextDisplay },
      { label: 'Nom d\'utilisateur\u00A0:', name: 'username', component: TextDisplay },
      { label: 'Prénom\u00A0:', name: 'firstName' },
      { label: 'Nom\u00A0:', name: 'lastName' },
      { label: 'Titre professionnel\u00A0:', name: 'title' },
      { label: 'Organisation\u00A0:', name: 'organisation' },
      { label: 'Division, direction, faculté\u00A0:', name: 'division' },
      { label: 'Service\u00A0:', name: 'service' },
    ]
  },
  { 
    title: 'Coordonnées',
    fields: [
      { label: 'Numéro civique\u00A0:', name: 'streetNumber' },
      { label: 'Rue, route\u00A0:', name: 'street' },
      { label: 'Appartement ou étage\u00A0:', name: 'apt' },
      { label: 'Municipalité\u00A0:', name: 'localityName' },
      { label: 'Province\u00A0:', name: 'province' },
      { label: 'Code postal, direction, faculté\u00A0:', name: 'postalCode' },
      { label: 'Téléphone\u00A0:', name: 'telephone' },
      { label: 'Extension\u00A0:', name: 'extension' },
      { label: 'Adresse de courriel\u00A0:', name: 'email' },
    ]
  },
  { 
    title: 'Statuts, rôles, droits d\'accès',
    fields: [
      { label: '\u00A0',  name: 'isActive', component: Checkbox, disabled: (data, watched, { user }) => { const { id } = user; return id === data.id }, props: { label: 'Actif' } },
      { label: '\u00A0',  name: 'isAdmin', component: Checkbox, disabled: (data, watched, { user }) => { const { id } = user; return id === data.id }, props: { label: 'Administrateur du système' } },
      { label: '\u00A0',  name: 'isPathologist', component: Checkbox, props: { label: 'Pathologiste responsable de dossier' } }
    ]
  },
  { 
    title: 'Permissions par programme',
    fields: [
    ]
  }
]

const EditUserDialog = ({ userId, close }) => {
  const { mutate, cache } = useSWRConfig()

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = useCallback(async (data) => {
    const result = await updateUserAction(userId, data)

    if (result) {
      await wait(1000)
      for (const key of cache.keys()) {
        if (key.includes('/api/admin/users')) {
          mutate(key)
        }
      }
    }
    
    return result
  }, [userId, mutate, cache])

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true)
        const fetchedData = await getUserAction(userId)
        setData(fetchedData)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [userId])
  
  if (isLoading) { return null }

  const fieldNames = formSchema.map(section => {
    const { fields } = section
    return fields
  }).flat().map(field => field.name)
  
  const defaultValues = fieldNames.reduce((acc, name) => {
    const value = data[name]
    acc[name] = value
    return acc
  }, {})

  defaultValues.id = userId

  return (
    <BaseDialog title={'Modification d\'un utilisateur'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditUserDialog
