'use client'
import { auth } from '@/auth'
import { signOut } from 'next-auth/react'

import { Box, Flex, HStack, Image, VStack, IconButton } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuSeparator
} from '@/components/ui/menu'

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { RxExit, RxHamburgerMenu } from 'react-icons/rx'

// import SignOutButton from './ui/sign-out-button'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const Toolbar = ({ session }) => {
  // const session = await auth()
  const { user } = session
  const { name : username, email } = user

  return (
    <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} pt={1} pe={2}>
        <Flex>
          <Image src={'/logo_sisfaune_small.png'} alt={'logo'} />
        </Flex>
        <HStack gap={[3, null, 1]}>
          <DesktopMenu username={username} email={email} />
          <MobileMenu username={username} email={email} />
        </HStack>
    </Flex>
  )
}

const DesktopMenu = ({ username, email }) => {
  return (
    <Flex hideBelow={'md'}>
<MenuRoot positioning={{ placement: 'bottom-end' }}>
            <MenuTrigger >
              <Avatar name={username} colorPalette={'green'} size={'sm'} variant={'solid'} cursor={'pointer'} />
            </MenuTrigger>
            <MenuContent minW={'48'} hideBelow={'md'}>
              <MenuItem _hover={{ bg: 'transparent' }} cursor={'default'}>
                <VStack gap={0} flex={1} alignItems={'flex-start'}>
                  <Box flex={1} fontWeight={500}>{username}</Box>
                  <Box flex={1} color={'gray.500'}>{email}</Box>
                </VStack>
              </MenuItem>
              <MenuItem>
                Paramètres
              </MenuItem>
              <MenuSeparator />
              <MenuItem onClick={() => { signOut() }}>
                <Box flex={1}>Quitter</Box>
                <RxExit />
              </MenuItem>
            </MenuContent>
          </MenuRoot>
          </Flex>
  )
}

const MobileMenu = ({ username, email }) => {
  return (
    <Flex hideFrom={'md'}>

<DrawerRoot placement={'top'} size={'full'}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
            <IconButton variant={'outline'} rounded={'full'} size={'sm'} >
        <RxHamburgerMenu />
      </IconButton>
            </DrawerTrigger>
            <DrawerContent hideFrom={'md'}>
              <DrawerHeader as={Flex} minH={24} flexDirection={'row'} alignItems={'center'}>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerCloseTrigger flex={1} />
              </DrawerHeader>
             
              <DrawerBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </DrawerBody>
              {/* <DrawerFooter>
                <DrawerActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerActionTrigger>
                <Button>Save</Button>
              </DrawerFooter> */}
              
            </DrawerContent>
          </DrawerRoot>
    </Flex>
  )
}

export default Toolbar

