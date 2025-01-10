// 'use client'

import { auth, signOut } from '@/auth'

import { IconButton } from '@chakra-ui/react'
import { MdExitToApp } from 'react-icons/md'

const signOutAction = async () => {
  'use server'
  await signOut()
}

const SignOut = async () => {
  const session = await auth()
  if (!session) {
    return null
  }
  return (
    <form action={signOutAction}>
      <IconButton type='submit' colorPalette='blue' rounded='full' size={['xl', null, 'md']}>
        <MdExitToApp />
      </IconButton>
    </form>
  )
}

// import { useFormStatus } from 'react-dom'
// import { Button } from '@/components/ui/button'

const SignOutButton = () => {
  // const { pending } = useFormStatus()
  return (
    <SignOut />
    // <Button type={'submit'} loading={false} loadingText={'Un instant...'}>Ouvrir</Button>
  )
}

export default SignOutButton
