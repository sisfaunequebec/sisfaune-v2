'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

const SignInButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type={'submit'} loading={pending} loadingText={'Un instant...'} colorPalette={'blue'} size={['xl', null, 'md']}>Ouvrir une session</Button>
  )
}

export default SignInButton