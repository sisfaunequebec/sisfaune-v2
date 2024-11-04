import { redirect } from "next/navigation"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

import { Flex, AbsoluteCenter, Image } from '@chakra-ui/react'
// import { Button } from '@/components/ui/button'

import SignInButton from './sign-in-button'

const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const signAction = async () => {
  'use server'
  try {
    await wait(500)
    await signIn('credentials', { redirectTo: '/evenements'})
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error
  }
}


 
export default async function SignInPage() {
  return (
    <Flex direction={'column'} justifyContent={'space-between'}>
      <AbsoluteCenter>
        <Flex direction={'column'} alignItems={'center'}>
          <Image src={'/logo_sisfaune_big.png'} alt={'logo'} mb={8} />
          <form action={signAction}>
            <SignInButton/ >
          </form>
        </Flex>
      </AbsoluteCenter>
    </Flex>
  )
}