'use client'
import { useState, useEffect, useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import updateUserSchema from './update-user.schema'
import getUserAction from './get-user.action'
import updateUserAction from './update-user.action'

import { Flex, Checkbox as ChakraCheckbox, VStack, HStack } from "@chakra-ui/react"

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'
import { Row } from '@/app/lib/components/dialogs/wrappers'

import SelectInput from '@/app/lib/components/inputs/base/select'

const YesNoSelect = (props) => {
  const items = [
    { id: 1, name: 'Oui' },
    { id: 0, name: 'Non' }
  ]
  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}


const RoleSelect = (props) => {
  const items = [
    { id: 'soumissionnaire', name: 'Soumissionnaire' },
    { id: 'gestion', name: 'Gestion' },
    { id: 'laboratoire', name: 'Laboratoire' },
    { id: 'consultation', name: 'Consultation' },
  ]
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

const PermissionsInput = ({ value: permissions = [], onChange, contentRef }) => {
  const handleCanSubmitChange = useCallback((programId, canSubmit) => { 
    onChange(permissions.map(p => p.programId === programId ? { ...p, canSubmit } : p))
  },[onChange, permissions])  

  const handleRoleChange = useCallback((programId, role) => { 
    const { id: roleId = null } = role || {}
    onChange(permissions.map(p => p.programId === programId ? { ...p, roleId } : p))
  },[onChange, permissions])

  return (
    <Flex direction={'column'} w={'full'} gap={4} justifyContent={'flex-start'}>
      <Row fontWeight={'medium'}>
        <Flex flex={4}>Rôle</Flex>
        <Flex flex={2} lineHeight={'1.1'}>Peut<br/>soumettre</Flex>
      </Row>
      <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2}>
        {permissions.map((permission, index) => {
          const { programId, roleId, canSubmit, program } = permission
          const { name } = program
        
          return (
            <Row key={programId} label={`${name}\u00A0:`} w={'full'} gap={4} alignItems={'center'} >
              <RoleSelect
                w={'full'}
                flex={4}
                value={roleId && { id: roleId }}
                onChange={(role) => handleRoleChange(programId, role)}
                contentRef={contentRef}
                clearable={true}
              />
              <YesNoSelect contentRef={contentRef} flex={2} value={canSubmit} onChange={(canSubmit) => handleCanSubmitChange(programId, canSubmit)} />
            </Row>
          )
        })}
      </VStack>
    </Flex>
  )
}
  

const formSchema = [
  { 
    title: 'Identification',
    fields: [
      // { label: 'Nom d\'utilisateur\u00A0:', name: 'username', component: TextDisplay },
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
      { label: 'Actif\u00A0:',  name: 'isActive', component: YesNoSelect, disabled: (data, watched, { user }) => { const { id } = user; return id === data.id } },
      { label: 'Administrateur du système\u00A0:',  name: 'isAdmin', component: YesNoSelect, disabled: (data, watched, { user }) => { const { id } = user; return id === data.id } },
      { label: 'Pathologiste responsable de dossier\u00A0:',  name: 'isPathologist', component: YesNoSelect },
      { label: 'Peut rouvrir un événement\u00A0:',  name: 'canReopenEvent', component: YesNoSelect }
]
  },
  { 
    title: 'Permissions par programme',
    fields: [
      { label: null, name: 'permissions', component: PermissionsInput },
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
        // setError(err)
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

  // Required to conditionaly disable other fields 
  defaultValues.id = userId

  console.debug('EditUserDialog', { data })

  return (
    <BaseDialog title={'Modification d\'un utilisateur'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={updateUserSchema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditUserDialog
