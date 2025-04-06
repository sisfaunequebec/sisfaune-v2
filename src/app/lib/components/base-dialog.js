'use client'
import { useCallback, useMemo, useRef } from 'react'

import { useForm, FormProvider, useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, Portal, Flex, Button, useBreakpointValue } from '@chakra-ui/react'

import {
  DialogActionTrigger,
  DialogFooter
} from '@/components/ui/dialog'

const BaseDialog = ({ title, size = 'md', schema, watches = [], defaultValues, onClose, onSubmit, submitBtnLabel = 'Continuer', close, children }) => {
  const rootSize = useBreakpointValue({ base: 'cover', md: size })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const form = useForm({
    resolver: schema && zodResolver(schema),
    defaultValues
  })

  const { handleSubmit, formState, watch } = form

  const watchedArray = watch(watches)

  const watched = watchedArray.reduce((acc, w, i) => {
    acc[watches[i]] = w
    return acc
  }, {})

  // console.debug('watched', watched, formState.errors)

   const handleAction = useCallback(async data => {
      try {
        if (onSubmit) {
          await onSubmit(data)
          onClose(false)
        } else {
          onClose(false)
        }
      } catch (e) {
        console.debug(e)
      }
    }, [onClose, onSubmit])
  
  const { isSubmitting } = formState

  const contentRef = useRef(null)

  return (
    <Dialog.Root lazyMount open size={rootSize} placement={'center'} motionPreset={motion} onOpenChange={e => onClose(false)} closeOnInteractOutside>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
        <Dialog.Content ref={contentRef}>

          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          <FormProvider {...form}>
            <Flex as={'form'} onSubmit={handleSubmit(handleAction)} direction={'column'} justifyContent={'stretch'} h={'100%'}>

              <Dialog.Body>
                { children(contentRef, watched) }
              </Dialog.Body>

              <DialogFooter gap={2}>
                <DialogActionTrigger asChild>
                  <Button size='sm' variant='outline' onClick={() => onClose(false)} minW={24}>Annuler</Button>
                </DialogActionTrigger>
                <Button type='submit' size='sm' colorPalette='blue' minW={24} loading={isSubmitting}>{submitBtnLabel}</Button>
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