'use client'

import { useToggle } from '@uidotdev/usehooks'

import useCurrentUser from '@/lib/auth/use-user-v2'

import { Flex, HStack, Image, VStack, Container } from '@chakra-ui/react'

import ExportManager from '../../../donnees/(list)/lib/containers/toolbar/export-manager'

import Menu from './menu'
import Hello from './hello'

const Header = () => {
  const { user } = useCurrentUser()
  const { fullName } = user ?? {}

  const [isExportManagerVisible, toggleExportManager] = useToggle(false)

  return (
    <Flex css={{ '--toolbar-height': '70px', '--toolbar-border-width': '2px', '--tabs-height': '0px' }} height='calc(var(--toolbar-height) + var(--tabs-height))' bg='white' _dark={{ bg: 'black' }} borderBottomColor='blue.600' borderBottomWidth='var(--toolbar-border-width)' position='sticky' zIndex={1002} alignItems='center' justifyContent='center' top={0} w='100%'>
      <VStack justifyContent='flex-end' alignItems='flex-end' flex={1} gap={0}>
        <Container maxWidth='6xl' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
          <Flex>
            <Image src='/logo_sisfaune_small.png' alt='logo' position='relative' left='-2' />
          </Flex>
          <HStack gap={[3, null, 4]}>
            <Flex hideBelow='md'><Hello name={fullName} /></Flex>
            <Menu user={user} onOpenExportManager={() => toggleExportManager(true)} />
          </HStack>
        </Container>
        <ExportManager isVisible={isExportManagerVisible} onClose={() => toggleExportManager(false)} />
      </VStack>
    </Flex>
  )
}

export default Header
