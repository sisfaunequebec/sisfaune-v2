'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { Flex, Fieldset, Input, useBreakpointValue } from '@chakra-ui/react'

import wait from '@/utilities/wait'

import Field from '@/components/field'
import { Button } from '@/components/ui/button'

import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from '@/components/ui/dialog'
import { useCallback } from 'react'

const schema = z.object({
  toto: z.string().email().min(1, { message: 'Le mot de passe est requis' }),
  titi: z.string().min(1, { })
})

const action = async (data) => {
  await wait(1000)
  const { toto } = data
  // console.debug(data)
  if (toto === 'error') {
    throw new Error()
  }

  console.debug(data)
}

const ParametresDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'md' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { toto: undefined }
  })

  const { register, handleSubmit, formState } = form

  const handleAction = useCallback(async data => {
    try {
      await action(data)
      close(false)
    } catch (e) {
      // close(false)
    }
  }, [close])

  const { isSubmitting } = formState

  return (
    <DialogRoot open size={size} placement='center' motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Vos paramètres</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <Flex as='form' autoComplete='off' onSubmit={handleSubmit(handleAction)} direction='column' justifyContent='stretch' h='100%'>

            <DialogBody>

              <Fieldset.Root>
                <Fieldset.Content>
                  <Field formState={formState} name='toto' label='Votre adresse de courriel :' variant='vertical'>
                    <Input autoComplete='off' {...register('toto')} />
                  </Field>
                  {/* <Field formState={formState} name={'titi'} label={'Votre prénom :'} variant={'horizontal'}>
                      <Input autoComplete={'off'} {...register('titi')} />
                    </Field> */}
                </Fieldset.Content>
              </Fieldset.Root>

            </DialogBody>

            <DialogFooter gap={2}>
              <DialogActionTrigger asChild>
                <Button size='sm' variant='outline' onClick={() => close(false)} minW={24}>Annuler</Button>
              </DialogActionTrigger>
              <Button type='submit' size='sm' colorPalette='blue' minW={24} loading={isSubmitting}>Modifier</Button>
            </DialogFooter>

          </Flex>
        </FormProvider>

      </DialogContent>
    </DialogRoot>
  )
}

export default ParametresDialog
