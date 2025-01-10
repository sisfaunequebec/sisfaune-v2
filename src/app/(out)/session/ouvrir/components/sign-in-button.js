'use client'

// import { useFormStatus } from 'react-dom'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

const SignInButton = () => {
  // const { pending } = useFormStatus()
  const { formState } = useFormContext()
  const { isSubmitting } = formState

  return (
    <Button type='submit' loading={isSubmitting} loadingText='Un instant...' colorPalette='blue' size={['xl', null, 'md']}>Ouvrir une session</Button>
  )
}

export default SignInButton
