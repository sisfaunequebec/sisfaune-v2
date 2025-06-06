'use client'
// import { useState } from 'react'

// import { DateTime } from 'luxon'

// import editUSer from './action'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/lib/data/users/service'
import useUser from '@/lib/data/users/use-user'

import { Fieldset, Input, Separator } from '@chakra-ui/react'
// import { RxCopy, RxCheckCircled } from 'react-icons/rx'

import BaseDialog from '@/app/lib/components/base-dialog'

// import ControlledField from '@/app/lib/components/controlled-field'

// import addUserSchema from './schema'
// import { InputGroup } from '@/components/ui/input-group'

const EditUserDialog = ({ userId, close }) => {
  const result = useUser(userId)
  const { user } = result

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (user) => {
      console.debug('mutationFn', user)
      return updateUser(user)
    },
    onSuccess: (data) => {
      console.debug('onSuccess', data)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      // queryClient.setQueriesData({ queryKey: ['users'] }, (old) => { console.debug('old', old); return old })
    }
  })

  const handleSubmit = () => {
    return mutation.mutateAsync({ id: userId, firstName: 'Bruno' })
  }

  return (
    <BaseDialog title={'Modification d\'un utilisateur'} onClose={close} onSubmit={handleSubmit} submitBtnLabel='Modifier' schema={null} defaultValues={null}>
      {(contentRef) => (
        <Fieldset.Root>
          { JSON.stringify(user) }
          {/* <Fieldset.Content gap={3}>
            <ControlledField name={'fullName'} label={'Nom complet :'} variant={'horizontal'}>
              <Input autoComplete={'off'} />
            </ControlledField>
            <ControlledField name={'email'} label={'Adresse de courriel :'} variant={'horizontal'}>
              <Input autoComplete={'off'} type={'email'} />
            </ControlledField>
            <Separator />
            <ControlledField name={'password'} label={'Mot de passe :'} variant={'horizontal'} helperText={'IMPORTANT : ce mot de passe a été généré automatiquement et sera envoyé par courriel à l\'utilisateur: il ne sera plus visible par la suite. Il est recommandé de le copier si nécessaire avant de continuer...'}>
              <PasswordDisplay />
            </ControlledField>
          </Fieldset.Content> */}
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default EditUserDialog
