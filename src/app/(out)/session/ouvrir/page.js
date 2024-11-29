'use client'

import { useFormState } from 'react-dom'

import { Flex, Stack, Image, Fieldset, Input } from '@chakra-ui/react'
import { Field as ChakraField } from "@/components/ui/field"

// import { Button } from '@/components/ui/button'

import signAction from './signin-action'
import SignInButton from './sign-in-button'

import { EMPTY_FORM_STATE } from '@/utilities/from-error-to-form-state'

const Field = ({ formState, children, name, ...rest }) => {
  const error = formState.validationErrors[name]?.[0]

  return (
    <ChakraField invalid={!!error} errorText={error} {...rest}>
      { children }
    </ChakraField>
  )
}

export default function SignInPage() {
  const [formState, action] = useFormState(signAction, EMPTY_FORM_STATE)

  const { status } = formState
  const hasError = (status === 'ERROR')

  return (
    <Flex direction={'column'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Flex as={'form'} action={action} direction={'column'} alignItems={'center'} justifyContent={'center'} shadow={'lg'} bg={'white'} p={8} borderRadius={'lg'} w={['full', 'auto']} h={['100%', 'auto']}>
          <Image src={'/logo_sisfaune_big.png'} alt={'logo'} mb={8} />
          <Fieldset.Root size={'lg'} maxW={'280px'} invalid={hasError}>
            {/* <Stack>
              <Fieldset.Legend>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack> */}

            <Fieldset.Content>

              <Field formState={formState} name={'email'} label={'Adresse de courriel :'}>
                <Input name={'email'} type={'email'} />
              </Field>

              <Field formState={formState} name={'password'} label={'Mot de passe :'}>
                <Input name={'password'} type={'password'} />
              </Field>

            </Fieldset.Content>

            <SignInButton />
          </Fieldset.Root>
        </Flex>
    </Flex>
  )
}