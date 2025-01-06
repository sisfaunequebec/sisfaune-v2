'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Flex, Image, Fieldset, Input } from '@chakra-ui/react'
import { Field as ChakraField } from "@/components/ui/field"
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"

import signInSchema from './sign-in-schema'
import signAction from './signin-action'
import SignInButton from './sign-in-button'

const Field = ({ formState, children, name, ...rest }) => {
  const { errors, isSubmitting } =  formState
  const error = errors[name]

  return (
    <ChakraField variant={'vertical'} invalid={!!error} errorText={error?.message} disabled={isSubmitting} {...rest}>
      { children }
    </ChakraField>
  )
}

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: undefined, password: undefined }
  })

  const { register, handleSubmit, formState } = form

  return (
    <>
      <FormProvider {...form}>
      <Flex as={'form'} autoComplete={'off'} onSubmit={handleSubmit(signAction)} direction={'column'} alignItems={'center'} justifyContent={'center'} shadow={'lg'} bg={'white'} p={8} borderRadius={'lg'} w={['full', 'auto']} h={['100%', 'auto']}>
        <Image src={'/logo_sisfaune_big.png'} alt={'logo'} mb={8} />
        <Fieldset.Root size={'lg'} maxW={'280px'} invalid={false}>
          <Fieldset.Content>
            <Field formState={formState} name={'email'} label={'Adresse de courriel :'}>
              <Input type={'email'} autoComplete={'off'} {...register('email')} />
            </Field>
            <Field formState={formState} name={'password'} label={'Mot de passe :'}>
              <PasswordInput autoComplete={'off'}  {...register('password')}  />
            </Field>
          </Fieldset.Content>
          <SignInButton />
        </Fieldset.Root>
      </Flex>
      </FormProvider>
    </>
  )
}

export default LoginForm