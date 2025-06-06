'use client'
import { useCallback, useMemo, useRef } from 'react'

import { useForm, FormProvider, useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, Portal, Flex, Button, useBreakpointValue, VStack, Text } from '@chakra-ui/react'

import {
  DialogActionTrigger,
  DialogFooter
} from '@/app/lib/components/ui/dialog'

const BaseDialog = ({ title, message, size = 'md', isAlert = false, schema, watches = [], defaultValues, onClose, onSubmit, submitBtnLabel = 'Continuer', close, children }) => {
  const rootSize = useBreakpointValue({ base: 'cover', md: size })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const form = useForm({
    resolver: schema && zodResolver(schema),
    defaultValues
  })

  const { handleSubmit, setError, clearErrors, formState: { errors, isValid, isSubmitting }, watch } = form

  const watchedArray = watch(watches)

  const watched = watchedArray.reduce((acc, w, i) => {
    acc[watches[i]] = w
    return acc
  }, {})

  // console.debug('watched', watched, errors)

  const handleSubmitAction = useCallback(async data => {
    // console.debug('here')
    try {
      // console.debug('try')
      if (onSubmit) {
        const result = await onSubmit(data)
        // console.debug('onSubmit', result)
        // const { payload } = result
        onClose(result)
        // if (errors) {
        //   Object.entries(errors).forEach(([key, value]) => {
        //     console.debug(key, value)
        //     setError(key, { message: value })
        //   })
        // } else {
        //   onClose(false)
        // }
      } else {
        onClose(false)
      }
    } catch (e) {
      console.debug(e)
      // console.debug('here', e.errors)
      // Object.entries(errors).forEach(([key, value]) => {
        // console.debug(key, value)
        setError('username', { message: 'shit' })
      // })
    }
  }, [onClose, onSubmit, clearErrors, setError, clearErrors])

  // const { isSubmitting } = formState

  const contentRef = useRef(null)

  const role = isAlert ? 'alert' : undefined
  const closeOnInteractOutside = !!isAlert

  const hasErrors = Object.keys(errors)?.length > 0

  return (
    <Dialog.Root lazyMount open size={rootSize} placement='center' motionPreset={motion} onOpenChange={e => onClose(false)} closeOnInteractOutside={closeOnInteractOutside} role={role}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>

            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <FormProvider {...form}>
              <Flex as='form' onSubmit={handleSubmit(handleSubmitAction)} direction='column' justifyContent='stretch' h='100%'>

                <Dialog.Body>
                  { message && <Text textStyle={['md', null, 'sm']} mb={4} lineHeight={'shorter'}>{message}</Text> }
                  <Flex>{ children(contentRef, watched) }</Flex>
                </Dialog.Body>

                <DialogFooter gap={2}>
                  <DialogActionTrigger asChild>
                    <Button size='sm' variant='outline' onClick={() => onClose(false)} minW={24}>Annuler</Button>
                  </DialogActionTrigger>
                  <Button type='submit' size='sm' colorPalette={(isAlert || hasErrors) ? 'red' : 'blue'} minW={24} loading={isSubmitting} onClick={() => clearErrors()}>{submitBtnLabel}</Button>
                </DialogFooter>

              </Flex>
            </FormProvider>

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default BaseDialog
