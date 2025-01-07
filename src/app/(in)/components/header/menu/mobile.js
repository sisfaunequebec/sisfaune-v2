'use client'
import { useState, useEffect, useCallback } from 'react'

import NextLink from 'next/link'
import { useRouter, usePathname  } from 'next/navigation'

import { signOut } from 'next-auth/react'

import { useToggle } from '@uidotdev/usehooks'
import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, HStack, Image, VStack, IconButton, Container, Separator, Link, Tabs } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'
// import { ColorModeButton } from "@/components/ui/color-mode"

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuSeparator,
  MenuRadioItem,
  MenuRadioItemGroup,
} from '@/components/ui/menu'

// import { DataListItem, DataListRoot } from "@/components/ui/data-list"

import { RxExit, RxHamburgerMenu, RxGear, RxCross1, RxCheck, RxPencil1 } from 'react-icons/rx'

import useDialog from '@/utilities/use-dialog'
import ParametresDialog from './parametres-dialog'

const MobileMenu = ({ username, email }) => {
  const [on, toggle] = useToggle(false)

  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const secondPathSegment = splitedPathname.at(1)

  const dialogs = []

  const { ask: openParameters, dialog: parametersDialog } = useDialog(ParametresDialog)
  dialogs.push(parametersDialog)

  const handleModifyParameters = useCallback(async () => {
    const result = await openParameters()
    if (result) {
      console.debug('Modify !!!')
    }
  }, [openParameters])

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
    <>
      { dialogs }

      <Flex hideFrom={'md'}>
        <IconButton variant={'outline'} rounded={'full'} size={['md', null, 'sm']} onClick={toggle} >
          { on ? <RxCross1 /> : <RxHamburgerMenu /> }
        </IconButton>
        { on &&
        <Flex data-state={on ? 'open' : 'closed'} animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }} animationDuration="slow"  bg={'white'} position={'fixed'} inset={'calc(var(--toolbar-height) - var(--toolbar-border-width)) 0 0'} overscrollBehavior={'contain'} zIndex={2002}>
          <Container maxW={'6xl'} fontSize={'lg'}>
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
              <Flex as={Link} py={2} alignItems={'center'} justifyContent={'space-between'} onClick={handleModifyParameters} >
                <Box>Vos paramètres...</Box>
                <RxGear />
              </Flex>
              <Separator />
              <Flex as={Link} onClick={() => { signOut() }} py={2}>
                <Box flex={1}>Quitter...</Box>
                <RxExit />
              </Flex>
            </VStack>
          </Container>
        </Flex>
        }
      </Flex>
      
    </>
  )
}

export default MobileMenu