'use client'
import { useState, useEffect } from 'react'
import { useToggle } from '@uidotdev/usehooks'

// import { auth } from '@/auth'
import { signOut } from 'next-auth/react'

import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, HStack, Image, VStack, IconButton, Container, Separator, Link, Tabs } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuSeparator
} from '@/components/ui/menu'

// import {
//   DrawerActionTrigger,
//   DrawerBackdrop,
//   DrawerBody,
//   DrawerCloseTrigger,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerRoot,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'

import { DataListItem, DataListRoot } from "@/components/ui/data-list"

import { RxExit, RxHamburgerMenu, RxGear, RxCross1 } from 'react-icons/rx'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const Toolbar = ({ session }) => {
  const { user } = session
  const { name: username, email } = user

  const [{ x, y }, scrollTo] = useWindowScroll()

  const toolbarShadowSize = y > 0 ? 'lg' : null
  const borderBottomWidth = y > 0 ? 0 : 4

  return (
    <Flex css={{ '--toolbar-height': '70px', '--toolbar-border-width': '2px', '--tabs-height': '40px' }} height={'calc(var(--toolbar-height) + var(--tabs-height))'} px={0} py={4} pb={0} bg={'white'} shadow={toolbarShadowSize} borderBottomWidth={'var(--toolbar-border-width)'} position={'sticky'} zIndex={10} alignItems={'flex-end'} justifyContent={'center'} top={0} w={'100%'}>
      <VStack justifyContent={'flex-end'} alignItems={'flex-end'} flex={1}>
        <Container maxWidth={'8xl'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Image src={'/logo_sisfaune_small.png'} alt={'logo'} />
          </Flex>
          <HStack gap={[3, null, 1]}>
            <DesktopMenu username={username} email={email} />
            <MobileMenu username={username} email={email} />
          </HStack>
        </Container>
        <Container display={'flex'}>
          <Tabs.Root defaultValue="database" top={'2px'} display={'flex'} flex={1} justifyContent={['center', null, null, null]}>
            <Tabs.List>
              <Tabs.Trigger value="database">
                Base de données
              </Tabs.Trigger>
              <Tabs.Trigger value="admin">
                Administation
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Container>
      </VStack>
    </Flex>
  )
}


const DesktopMenu = ({ username, email }) => {
  return (
    <Flex hideBelow={'lg'}>
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
            <Box flex={1}>Vos paramètres</Box>
            <RxGear />
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
  const [on, toggle] = useToggle(false)

  useEffect(() => {
    if (on) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
    // return () => ;
 }, [on]);

  return (
    <Flex hideFrom={'lg'}>
      <IconButton variant={'outline'} rounded={'full'} size={'sm'} onClick={toggle} >
        { on ? <RxCross1 /> : <RxHamburgerMenu /> }
      </IconButton>
      { on &&
      <Flex bg={'white'} position={'fixed'} inset={'calc(var(--toolbar-height) - var(--toolbar-border-width)) 0 0'} overscrollBehavior={'contain'} zIndex={1000}>
        <Container>
          <VStack alignItems={'stretch'} justifyContent={'center'} px={2}>
            <Flex flex={1} py={2}>
              <VStack gap={0} flex={1} alignItems={'flex-start'}>
                <Box flex={1} fontWeight={500}>{username}</Box>
                <Box flex={1} color={'gray.500'}>{email}</Box>
              </VStack>
            </Flex>
            <Separator />
            <Flex as={Link} py={2} alignItems={'center'} justifyContent={'space-between'} >
              <Box>Vos paramètres</Box>
              <RxGear />
            </Flex>
            <Separator />
            <Flex as={Link} onClick={() => { signOut() }} py={2}>
              <Box flex={1}>Quitter</Box>
              <RxExit />
            </Flex>
          </VStack>
        </Container>
      </Flex>
      }
      {/* <DrawerRoot placement={'top'} size={'full'}>
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
        </DrawerContent>
      </DrawerRoot> */}
    </Flex>
  )
}

export default Toolbar

