'use client'
import { useCallback } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { signOut } from 'next-auth/react'

import { Box, Flex, VStack, Button } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuSeparator,
  MenuRadioItem,
  MenuRadioItemGroup
} from '@/components/ui/menu'

import { RxExit, RxGear } from 'react-icons/rx'

import useDialog from '@/utilitaires/use-dialog'
import ParametresDialog from './parametres-dialog'

const DesktopMenu = ({ username, email }) => {
  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const secondPathSegment = splitedPathname.at(1)

  // const dialogs = []

  const { ask: openParameters, dialog: parametersDialog } = useDialog(ParametresDialog)
  // dialogs.push(parametersDialog)

  const handleModifyParameters = useCallback(async () => {
    const result = await openParameters()
    if (result) {
      console.debug('Modify !!!')
    }
  }, [openParameters])

  const router = useRouter()

  const handleMenuRadioItemGroupChange = useCallback(e => {
    const { value } = e
    const targetUrl = value === 'donnees' ? '/donnees/evenements' : '/administration/utilisateurs'
    router.push(targetUrl)
  }, [router])

  return (
    <>
      {parametersDialog}

      <Flex hideBelow='md'>
        <MenuRoot positioning={{ placement: 'bottom-end' }} size='md' lazyMount>
          <MenuTrigger>
            <Avatar name={username} colorPalette='green' size={['md', null, 'sm']} variant='solid' cursor='pointer' />
          </MenuTrigger>
          <MenuContent minW={60} hideBelow='md' mt={4} isolation='isolate' isolate='isolate'>
            <MenuItem _hover={{ bg: 'transparent' }} cursor='default'>
              <VStack gap={0} flex={1} alignItems='flex-start'>
                <Box flex={1} fontWeight={500}>{username}</Box>
                <Box flex={1} color='gray.500'>{email}</Box>
              </VStack>
            </MenuItem>
            <MenuSeparator />
            <MenuRadioItemGroup value={secondPathSegment} onValueChange={handleMenuRadioItemGroupChange}>
              <MenuRadioItem value='donnees'>Base de données</MenuRadioItem>
              <MenuRadioItem value='administration'>Administration</MenuRadioItem>
            </MenuRadioItemGroup>
            <MenuSeparator />
            <MenuItem as={Button} onClick={handleModifyParameters}>
              <RxGear />
              <Box flex={1} ms={0.5}>Vos paramètres...</Box>
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => { signOut() }}>
              <RxExit />
              <Box flex={1} ms={0.5}>Quitter...</Box>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>

    </>
  )
}

export default DesktopMenu
