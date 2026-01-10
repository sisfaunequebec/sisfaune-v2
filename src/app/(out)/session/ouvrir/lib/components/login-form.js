'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useForm, FormProvider } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

import { Flex, Image, Fieldset, Input, Link, VStack, Alert } from '@chakra-ui/react'

import { PasswordInput } from '@/app/lib/components/ui/password-input'

import useDialog from '@/utils/use-dialog'

import Field from '@/app/lib/components/field'

import signAction from './signin.action'
import SignInButton from './sign-in-button'

import * as v from 'valibot'

const schema = v.object({
  username: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Le nom d\'utilisateur est requis')
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('Le mot de passe est requis')
  )
})

import ResetPasswordDialog from './reset-password-dialog'
import FirstLoginDialog from './first-login-dialog'

const LoginForm = () => {
  const { update } = useSession()
  const router = useRouter()
  
  const { ask: resetPassword, dialog: resetPasswordDialog } = useDialog(ResetPasswordDialog)
  const { ask: newPassword, dialog: firstLoginDialog } = useDialog(FirstLoginDialog)

  const form = useForm({
    resolver: valibotResolver(schema, { reValidateMode: 'onSubmit' }),
    defaultValues: { username: undefined, password: undefined }
  })

  const { register, handleSubmit, setError, formState } = form

  const onSubmit = async (data) => {
    const result = await signAction(data)

    const { errors } = result

    if (errors) {
      Object.entries(errors).forEach(([name, message]) => {
        setError(name, { type: 'server', message })
      }) 
    } else {
      router.replace('/donnees/evenements')
    }

    return result
  }

  return (
    <>
      { resetPasswordDialog }
      { firstLoginDialog}
      <FormProvider {...form}>
        <Flex as='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} direction='column' alignItems='center' justifyContent='center' shadow='lg' bg='white' p={8} borderRadius='lg' w={['full', 'auto']} h={['100%', 'auto']}>
          <Image src='/logo_sisfaune_big.png' alt='logo' mb={3} />
          <Fieldset.Root size='lg' maxW='280px' invalid={false}>
            <Alert.Root status={'warning'}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>ATTENTION</Alert.Title>
                <Alert.Description>
                  Si vous vous connectez pour la <strong>première fois à la nouvelle version</strong> de SIS Faune, <Link href={'#'} textDecoration={'underline'} fontWeight={'bold'} onClick={(e) => {e.preventDefault(); newPassword();}}>veuillez cliquer ici</Link>.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
            <Fieldset.Content as={VStack} gap={1} mt={2}>
              <Field formState={formState} name={'username'} label={'Nom d\'utilisateur :'}>
                <Input autoComplete='off' {...register('username')} size={'sm'} />
              </Field>
              <Field formState={formState} name={'password'} label={'Mot de passe :'}>
                <PasswordInput autoComplete='off' {...register('password')} size={'sm'} />
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
