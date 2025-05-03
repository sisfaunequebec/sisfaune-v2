'use client'
import { useEffect } from 'react'

import NextLink from 'next/link'

import { AbsoluteCenter, Button, Container, Image } from '@chakra-ui/react'

import CenteredMessage from './lib/components/centered-message'
 
const RootError = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <AbsoluteCenter as={Container}>
      <CenteredMessage level={'error'} title={'Désolé !'} description={'Une erreur s\'est produite'}>
        <Button as={NextLink} size={['lg', null, 'md']} href={'/'} variant={'surface'} colorPalette={'green'}>Revenir à la page d&apos;accueil</Button>
      </CenteredMessage>
    </AbsoluteCenter>
  )
}

export default RootError