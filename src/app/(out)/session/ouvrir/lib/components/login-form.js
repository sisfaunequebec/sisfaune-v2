'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Flex, Image, Fieldset, Input, Link } from '@chakra-ui/react'

import { PasswordInput } from '@/app/lib/components/ui/password-input'

import useDialog from '@/utils/use-dialog'

import Field from '@/app/lib/components/field'

import signInSchema from './sign-in-schema'
import signAction from './signin.action'
import SignInButton from './sign-in-button'

import * as v from 'valibot'

const valibotSignInSchema = v.object({
  username: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Le nom d\'utilisateur est requis')
    // v.endsWith('cool', 'Needs to end with `cool`'),
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Le mot de passe est requis')
  )
})

import ResetPasswordDialog from './reset-password-dialog'

const LoginForm = () => {
  const { ask: resetPassword, dialog: resetPasswordDialog } = useDialog(ResetPasswordDialog)

  const form = useForm({
    resolver: valibotResolver(valibotSignInSchema, { reValidateMode: 'onSubmit' }),
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
      { resetPasswordDialog }

      <FormProvider {...form}>
        <Flex as='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='center' justifyContent='center' shadow='lg' bg='white' p={8} borderRadius='lg' w={['full', 'auto']} h={['100%', 'auto']}>
          <Image src='/logo_sisfaune_big.png' alt='logo' mb={8} />
          <Fieldset.Root size='lg' maxW='280px' invalid={false}>
            <Fieldset.Content>
              <Field formState={formState} name={'username'} label={'Nom d\'utilisateur :'}>
                <Input autoComplete='off' {...register('username')} />
              </Field>
              <Field formState={formState} name={'password'} label={'Mot de passe :'}>
                <PasswordInput autoComplete='off' {...register('password')} />
              </Field>
            </Fieldset.Content>
            <SignInButton />
            <Link variant={'underline'} href={'#'} colorPalette={'blue'} onClick={(e) => {e.preventDefault(); resetPassword();}}>Mot de passe oublié ?</Link>
          </Fieldset.Root>
        </Flex>
      </FormProvider>
    </>
  )
}

export default LoginForm
