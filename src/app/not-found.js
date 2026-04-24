'use client'
import NextLink from 'next/link'

import { AbsoluteCenter, Button, Container } from '@chakra-ui/react'

import CenteredMessage from '@/app/lib/components/centered-message'

const NotFoundPage = () => {
  return (
    <AbsoluteCenter as={Container}>
      <CenteredMessage level={'warning'} title={'Désolé'} description={'Cette page est introuvable'}>
        <Button as={NextLink} size={['lg', null, 'md']} href={'/'} variant={'surface'} colorPalette={'green'}>Revenir à la page d&apos;accueil</Button>
      </CenteredMessage>
    </AbsoluteCenter>
  )
}

export default NotFoundPage

