'use client'
import { useCallback, useMemo, useRef } from 'react'

import { useForm, FormProvider, useController } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Dialog, Portal, Flex, Button, useBreakpointValue, VStack, Text } from '@chakra-ui/react'

import {
  DialogActionTrigger,
  DialogFooter
} from '@/app/lib/components/ui/dialog'

const getResolver = (type, schema) => {
  if (!schema) return null
  return type === 'zod' ? zodResolver(schema) : valibotResolver(schema, { reValidateMode: 'onSubmit' })
}

const BaseDialog = ({ title, message, size, isAlert = false, schema, schemaType = 'zod', watches = [], defaultValues, onClose, onSubmit, submitBtnLabel = 'OK', children }) => {
  const rootSize = useBreakpointValue({ base: 'cover', md: size || (isAlert ? 'sm' : 'lg') })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const resolver = getResolver(schemaType, schema)

  const form = useForm({
    resolver,
    defaultValues
  })

  const { handleSubmit, setError, clearErrors, formState, watch } = form
  const { errors, isSubmitting } = formState

  const watchedArray = watch(watches)

  const watched = watchedArray.reduce((acc, w, i) => {
    acc[watches[i]] = w
    return acc
  }, {})

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
        // setError('username', { message: 'shit' })
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
              <Dialog.Title textStyle={['xl', null, 'lg']} >{title}</Dialog.Title>
            </Dialog.Header>

            <FormProvider {...form}>
              <Flex as={'form'} onSubmit={handleSubmit(handleSubmitAction)} direction={'column'} justifyContent={'stretch'} h={'100%'}>

                <Dialog.Body textStyle={['md', null, 'sm']} >
                  { message && <Text mb={4} lineHeight={'shorter'}>{message}</Text> }
                  <VStack flex={1} alignItems={'stretch'} gap={1}>{ children(contentRef, watched) }</VStack>
                </Dialog.Body>

                <DialogFooter gap={2}>
                  <DialogActionTrigger asChild>
                    <Button size={['lg', null, 'sm']} variant={'outline'} onClick={() => onClose(false)} minW={24}>Annuler</Button>
                  </DialogActionTrigger>
                  <Button type={'submit'} size={['lg', null, 'sm']} colorPalette={isSubmitting ? 'blue' : ((isAlert || hasErrors) ? 'red' : 'blue')} minW={24} loading={isSubmitting} onClick={() => clearErrors()}>{submitBtnLabel}</Button>
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
