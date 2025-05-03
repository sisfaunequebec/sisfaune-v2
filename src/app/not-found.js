import NextLink from 'next/link'

import CenteredMessage from '@/app/lib/components/centered-message'
import { AbsoluteCenter, Button, Container, Image } from '@chakra-ui/react'

export const metadata = {
  title: `Page introuvable | SIS Faune`
}

const NotFoundPage = () => {
  return (
    <AbsoluteCenter as={Container}>
      <CenteredMessage level={'warning'} title={'Désolé !'} description={'Cette page est introuvable'}>
        <Button as={NextLink} size={['lg', null, 'md']} href={'/'} variant={'surface'} colorPalette={'green'}>Revenir à la page d&apos;accueil</Button>
      </CenteredMessage>
    </AbsoluteCenter>
  )
}

export default NotFoundPage

