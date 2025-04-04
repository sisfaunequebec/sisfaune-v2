'use client'
import { useCallback } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { signOut } from 'next-auth/react'

import { Box, Flex, VStack, Button, Menu } from '@chakra-ui/react'

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
// import ParametresDialog from '../../../containers/parametres-dialog'

import UserParametersDialog from '../../../containers/user-parameters-dialog.js'

const DesktopMenu = ({ username, email }) => {
  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const secondPathSegment = splitedPathname.at(1)

  // const dialogs = []

  const { ask: openParameters, dialog: parametersDialog } = useDialog(UserParametersDialog)
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

      <Flex hideBelow={'md'}>
        <Menu.Root positioning={{ placement: 'bottom-end' }} size={'md'} lazyMount>
          <Menu.Trigger>
            <Avatar name={username} colorPalette={'green'} size={['md', null, 'sm']} variant={'solid'} cursor={'pointer'} />
          </Menu.Trigger>
          <MenuContent minW={60} hideBelow={'md'} mt={4} isolation={'isolate'} isolate={'isolate'}  _hover={{ bg: 'white' }}>
            <Menu.Item cursor={'default'} value={'info'}>
              <VStack gap={0} flex={1} alignItems={'flex-start'}>
                <Box flex={1} fontWeight={500}>{username}</Box>
                <Box flex={1} color={'gray.500'}>{email}</Box>
              </VStack>
            </Menu.Item>
            <Menu.Separator />
            <MenuRadioItemGroup value={secondPathSegment} onValueChange={handleMenuRadioItemGroupChange}>
              <MenuRadioItem value={'donnees'}>Base de données</MenuRadioItem>
              <MenuRadioItem value={'administration'}>Administration</MenuRadioItem>
            </MenuRadioItemGroup>
            <Menu.Separator />
            <Menu.Item onClick={handleModifyParameters} value={'params'}>
              <RxGear />
              <Box flex={1} ms={0.5}>Vos paramètres...</Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={() => { signOut() }} value={'signout'}>
              <RxExit />
              <Box flex={1} ms={0.5}>Quitter...</Box>
            </Menu.Item>
          </MenuContent>
        </Menu.Root>
      </Flex>

    </>
  )
}

export default DesktopMenu
