import NextLink from 'next/link'

import { Button } from '@chakra-ui/react'

import CenteredMessage from './centered-message'

const UnauthorizedMessage = () => {
  return (
    <CenteredMessage level={'warning'} title={'Désolé'} description={'Vous n\'êtes pas autorisé à consulter cette page'}>
      <Button as={NextLink} size={['lg', null, 'md']} href={'/donnees'} variant={'surface'} colorPalette={'green'}>Revenir à la base de données</Button>
    </CenteredMessage>
  )
}

export default UnauthorizedMessage