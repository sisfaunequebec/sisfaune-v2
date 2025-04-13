'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Flex, Image, Fieldset, Input } from '@chakra-ui/react'

import { PasswordInput } from '@/components/ui/password-input'

import Field from '@/app/lib/components/field'

import signInSchema from './sign-in-schema'
import signAction from './signin-action'
import SignInButton from './sign-in-button'

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema, { reValidateMode: 'onSubmit' }),
    defaultValues: { email: undefined, password: undefined }
  })

  const { register, handleSubmit, setError, formState } = form

  const onSubmit = async (data) => {
    const result = await signAction(data)

    const { errors } = result
    Object.entries(errors).forEach(([name, message]) => {
      setError(name, { type: 'server', message })
    })
  }

  return (
    <>
      <FormProvider {...form}>
        <Flex as='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='center' justifyContent='center' shadow='lg' bg='white' p={8} borderRadius='lg' w={['full', 'auto']} h={['100%', 'auto']}>
          <Image src='/logo_sisfaune_big.png' alt='logo' mb={8} />
          <Fieldset.Root size='lg' maxW='280px' invalid={false}>
            <Fieldset.Content>
              <Field formState={formState} name='email' label='Adresse de courriel :'>
                <Input type='email' autoComplete='off' {...register('email')} />
              </Field>
              <Field formState={formState} name='password' label='Mot de passe :'>
                <PasswordInput autoComplete='off' {...register('password')} />
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
