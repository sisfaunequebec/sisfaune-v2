'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Flex, Image, Fieldset, Input } from '@chakra-ui/react'
import { Field as ChakraField } from "@/components/ui/field"

import signInSchema from './sign-in-schema'
import signAction from './signin-action'
import SignInButton from './sign-in-button'

const Field = ({ formState, children, name, ...rest }) => {
  const { errors, isSubmitting } =  formState
  const error = errors[name]

  return (
    <ChakraField invalid={!!error} errorText={error?.message} disabled={isSubmitting} {...rest}>
      { children }
    </ChakraField>
  )
}

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: undefined, password: undefined }
  })

  const { register, handleSubmit, formState } = form

  return (
    <Flex direction={'column'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <FormProvider {...form}>
        <Flex as={'form'} autoComplete={'off'} onSubmit={handleSubmit(signAction)} direction={'column'} alignItems={'center'} justifyContent={'center'} shadow={'lg'} bg={'white'} p={8} borderRadius={'lg'} w={['full', 'auto']} h={['100%', 'auto']}>
          <Image src={'/logo_sisfaune_big.png'} alt={'logo'} mb={8} />
          <Fieldset.Root size={'lg'} maxW={'280px'} invalid={false}>
            <Fieldset.Content>
              <Field formState={formState} name={'email'} label={'Adresse de courriel :'}>
                <Input type={'email'} autoComplete={'off'} {...register('email')} />
              </Field>
              <Field formState={formState} name={'password'} label={'Mot de passe :'}>
                <Input type={'password'} autoComplete={'off'}  {...register('password')}  />
              </Field>
            </Fieldset.Content>
            <SignInButton />
          </Fieldset.Root>
        </Flex>
        </FormProvider>
    </Flex>
  )
}