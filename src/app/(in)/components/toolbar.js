'use client'
import { useState, useEffect, useCallback } from 'react'

import NextLink from 'next/link'
import { useRouter, usePathname  } from 'next/navigation'

import { signOut } from 'next-auth/react'

import { useToggle } from '@uidotdev/usehooks'
import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, HStack, Image, VStack, IconButton, Container, Separator, Link, Tabs } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuSeparator,
  MenuRadioItem,
  MenuRadioItemGroup,
} from '@/components/ui/menu'

import { DataListItem, DataListRoot } from "@/components/ui/data-list"

import { RxExit, RxHamburgerMenu, RxGear, RxCross1, RxCheck } from 'react-icons/rx'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const Toolbar = ({ session }) => {
  const { user } = session
  const { name: username, email } = user

  const [{ x, y }, scrollTo] = useWindowScroll()

  const toolbarShadowSize = null // y > 0 ? 'md' : null
  const borderBottomWidth = y > 0 ? 0 : 8

  return (
    <Flex css={{ '--toolbar-height': '70px', '--toolbar-border-width': '2px', '--tabs-height': '0px' }} height={'calc(var(--toolbar-height) + var(--tabs-height))'} bg={'white'}  borderBottomColor={'blue.600'} borderBottomWidth={'var(--toolbar-border-width)'} position={'sticky'} zIndex={10} alignItems={'center'} justifyContent={'center'} top={0} w={'100%'}>
      <VStack justifyContent={'flex-end'} alignItems={'flex-end'} flex={1} gap={0}>
        <Container maxWidth={'4xl'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Flex>
            <Image src={'/logo_sisfaune_small.png'} alt={'logo'} position={'relative'} left={'-2'} />
          </Flex>
          <HStack gap={[3, null, 1]}>
            <DesktopMenu username={username} email={email} />
            <MobileMenu username={username} email={email} />
          </HStack>
        </Container>
      </VStack>
    </Flex>
  )
}

const DesktopMenu = ({ username, email }) => {

  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const secondPathSegment = splitedPathname.at(1)

  const router = useRouter()

  const handleMenuRadioItemGroupChange = useCallback(e => {
    const { value } = e
    const targetUrl = value === 'donnees' ? '/donnees/evenements' : '/administration'
    router.push(targetUrl)
  }, [router])

  return (
    <Flex hideBelow={'md'}>
      <MenuRoot positioning={{ placement: 'bottom-end' }} size={'md'}>
        <MenuTrigger >
          <Avatar name={username} colorPalette={'green'} size={['md', null, 'sm']} variant={'solid'} cursor={'pointer'} />
        </MenuTrigger>
        <MenuContent minW={'48'} hideBelow={'md'}>
          <MenuItem _hover={{ bg: 'transparent' }} cursor={'default'}>
            <VStack gap={0} flex={1} alignItems={'flex-start'}>
              <Box flex={1} fontWeight={500}>{username}</Box>
              <Box flex={1} color={'gray.500'}>{email}</Box>
            </VStack>
          </MenuItem>
          <MenuSeparator />
          <MenuRadioItemGroup
            value={secondPathSegment}
            onValueChange={handleMenuRadioItemGroupChange}
          >
            <MenuRadioItem value={'donnees'}>Base de données</MenuRadioItem>
            <MenuRadioItem value={'administration'}>Administration</MenuRadioItem>
          </MenuRadioItemGroup>
          <MenuSeparator />
          <MenuItem>
            <RxGear />
            <Box flex={1} ms={0.5}>Vos paramètres</Box>
          </MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => { signOut() }}>
            <RxExit />
            <Box flex={1} ms={0.5}>Quitter</Box>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Flex>
  )
}

const MobileMenu = ({ username, email }) => {
  const [on, toggle] = useToggle(false)

  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const secondPathSegment = splitedPathname.at(1)

  const router = useRouter()

  const handleLinkClick = useCallback(value => {
    const targetUrl = value === 'donnees' ? '/donnees/evenements' : '/administration'
    router.push(targetUrl)
    toggle()
  }, [router, toggle])

  useEffect(() => {
    if (on) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
 }, [on])

  return (
    <Flex hideFrom={'md'}>
      <IconButton variant={'outline'} rounded={'full'} size={['md', null, 'sm']} onClick={toggle} >
        { on ? <RxCross1 /> : <RxHamburgerMenu /> }
      </IconButton>
      { on &&
      <Flex bg={'white'} position={'fixed'} inset={'calc(var(--toolbar-height) - var(--toolbar-border-width)) 0 0'} overscrollBehavior={'contain'} zIndex={2001}>
        <Container maxW={'4xl'}>
          <VStack alignItems={'stretch'} justifyContent={'center'} px={0}>
            <Flex flex={1} py={2}>
              <VStack gap={0} flex={1} alignItems={'flex-start'}>
                <Box flex={1} fontWeight={500}>{username}</Box>
                <Box flex={1} color={'gray.500'}>{email}</Box>
              </VStack>
            </Flex>
            <Separator />
            <VStack alignItems={'stretch'} justifyContent={'center'} px={0} gap={0}>
              <Flex py={2} alignItems={'center'} justifyContent={'space-between'} onClick={() => handleLinkClick('donnees')}>
                <Box>Base de données</Box>
                {(secondPathSegment === 'donnees') && <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </Flex>
              <Flex py={2} alignItems={'center'} justifyContent={'space-between'} onClick={() => handleLinkClick('administration')}>
                <Box>Administration</Box>
                {(secondPathSegment === 'administration') && <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </Flex>
            </VStack>
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

