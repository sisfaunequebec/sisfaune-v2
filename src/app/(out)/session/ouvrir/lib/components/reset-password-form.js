'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Flex, Image, Fieldset, Input, Link } from '@chakra-ui/react'

import { PasswordInput } from '@/app/lib/components/ui/password-input'

import Field from '@/app/lib/components/field'

import resetPasswordSchema from './reset-password-schema'
// import signAction from './signin-action'
// import SignInButton from './sign-in-button'

const ResetPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema, { reValidateMode: 'onSubmit' }),
    defaultValues: { username: undefined, password: undefined }
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
          <Fieldset.Root size='lg' maxW='280px' invalid={false}>
            <Fieldset.Content>
              <Field formState={formState} name={'username'} label={'Nom d\'utilisateur :'}>
                <Input autoComplete='off' {...register('username')} />
              </Field>
            </Fieldset.Content>
            {/* <SignInButton /> */}
          </Fieldset.Root>
        </Flex>
      </FormProvider>
    </>
  )
}

export default ResetPasswordForm
