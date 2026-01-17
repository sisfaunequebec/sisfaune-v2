'use client'
import { useCallback, useState, useEffect, useRef } from 'react'

import { useForm, FormProvider, useController } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Dialog, Portal, Flex, Button, useBreakpointValue, VStack, Text } from '@chakra-ui/react'
import { Fieldset, Separator } from '@chakra-ui/react'

import {
  DialogActionTrigger,
  DialogFooter
} from '@/app/lib/components/ui/dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import TextInput from '@/app/lib/components/inputs/base/text'

import useCurrentUser from '@/lib/auth/use-user'

const getResolver = (type, schema) => {
  if (!schema) return null
  return type === 'zod' ? zodResolver(schema) : valibotResolver(schema, { reValidateMode: 'onSubmit' })
}

const BaseDialog = ({ title, message, size, isAlert = false, schema, schemaType = 'zod', watches = [], defaultValues, onClose, onSubmit, submitBtnLabel = 'OK', children }) => {
  const rootSize = useBreakpointValue({ base: 'full', md: size || (isAlert ? 'sm' : 'lg') })
  const placement = useBreakpointValue({ base: null, md: 'center' }) 
  const scrollBehavior = useBreakpointValue({ base: 'inside', md: 'outside' }) 
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
    try {
      if (onSubmit) {
        const { data: payload = true, errors } = await onSubmit(data) || {}

        if (!errors) {
          onClose(payload)
        }
        
        Object.entries(errors || {}).forEach(([name, message]) => {
          setError(name, { type: 'server', message })
        })     
      } else {
        onClose(false)
      }
    } catch (e) {
      console.warn(e)
    }
  }, [onClose, onSubmit, clearErrors, setError, clearErrors])

  const contentRef = useRef(null)

  const role = isAlert ? 'alert' : undefined
  const closeOnInteractOutside = !!isAlert

  const hasErrors = Object.keys(errors)?.length > 0

  const { user: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser() 
  // if (isLoadingUser) { return null }

  return (
    <Dialog.Root scrollBehavior={scrollBehavior} lazyMount open={!isLoadingCurrentUser} size={rootSize} placement={placement} motionPreset={motion} onOpenChange={e => onClose(false)} closeOnInteractOutside={closeOnInteractOutside} role={role}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <FormProvider {...form}>
          <Dialog.Content ref={contentRef} as={'form'} onSubmit={handleSubmit(handleSubmitAction)} direction={'column'} justifyContent={'stretch'} alignItems={'stretch'} >

            <Dialog.Header>
              <Dialog.Title textStyle={['xl', null, 'lg']} >{title}</Dialog.Title>
            </Dialog.Header>

              {/* <Flex as={'form'} onSubmit={handleSubmit(handleSubmitAction)} direction={'column'} justifyContent={'stretch'} alignItems={'stretch'} h={'100%'}> */}

                <Dialog.Body textStyle={['md', null, 'sm']} >
                  { message && <Text mb={4} lineHeight={'shorter'}>{message}</Text> }
                  <VStack flex={1} alignItems={'stretch'} gap={1}>{ children(contentRef, watched, isSubmitting) }</VStack>
                </Dialog.Body>

                <DialogFooter gap={2}>
                  <DialogActionTrigger asChild>
                    <Button size={['lg', null, 'sm']} variant={'outline'} onClick={() => onClose(false)} minW={24}>Annuler</Button>
                  </DialogActionTrigger>
                  <Button type={'submit'} size={['lg', null, 'sm']} colorPalette={isSubmitting ? 'blue' : ((isAlert || hasErrors) ? 'red' : 'blue')} minW={24} loading={isSubmitting} onClick={() => clearErrors()}>{submitBtnLabel}</Button>
                </DialogFooter>

              {/* </Flex> */}
            

          </Dialog.Content>
          </FormProvider>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const Fields = ({ formSchema, contentRef, watched, data, ...rest }) => {
  const { user: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser() 

  const sectionsCount = formSchema.length

  return (
     <VStack gap={2} flex={1} {...rest}>
      {formSchema.map((section, i) => {
        const { title, visible, fields } = section
        const isVisible = visible !== undefined ? (typeof visible === 'function') ? visible(data, watched) : visible : true
        if (!isVisible) { return null }
        return (
          <Fieldset.Root key={title} gap={2} pt={4}>
            { title && <Fieldset.Legend>{title}</Fieldset.Legend> }
            <Fieldset.Content gap={2}>
              {fields.map(f => {
                const { label, name, disabled = false, visible = true, component, props = {} } = f
                
                const isDisabled = (typeof disabled === 'function') ? disabled(data, watched, { user: currentUser }) : disabled
                const isVisible = (typeof visible === 'function') ? visible(data, watched, { user: currentUser }) : visible
                const properties = (typeof props === 'function') ? props(data, watched, { user: currentUser }) : props
                
                const Component = component || TextInput
                if (!isVisible) { return null }
                return (
                  <ControlledField key={name} label={label} name={name} variant={'horizontal'}>
                    <Component contentRef={contentRef} disabled={isDisabled} data={data} {...properties} />
                  </ControlledField>
                )
              })}
            </Fieldset.Content>
            { (sectionsCount > i + 1) && <Separator /> }
          </Fieldset.Root>
        )
      })}
    </VStack>
  )
  
}

export default BaseDialog

export {
  Fields
}
