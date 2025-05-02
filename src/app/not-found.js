import NextLink from 'next/link'

import { Container, AbsoluteCenter, Button } from '@chakra-ui/react'
import CenteredMessage from '@/app/lib/components/centered-message'

export const metadata = {
  title: `Page introuvable | SIS Faune`
}

const NotFoundPage = () => {
  return (
    <AbsoluteCenter as={Container}>
      <CenteredMessage level={'warning'} title={'Désolé !'} description={'Cette page est introuvable'}>
        <Button as={NextLink} href={'/donnees'}>Revenir à la page d&apos;accueil</Button>
      </CenteredMessage>
    </AbsoluteCenter>
  )
}

export default NotFoundPage

