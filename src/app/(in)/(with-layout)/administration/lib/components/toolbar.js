/* eslint-disable react/jsx-curly-brace-presence */
'use client'

import { useWindowScroll } from '@uidotdev/usehooks'

import NextLink from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Container, Flex, HStack, Link, Tabs } from '@chakra-ui/react'

const StyledTrigger = ({ children, ...rest }) => {
  return (
    <Tabs.Trigger {...rest} borderRadius={['full', null, 'md']} borderBottomRadius={['full', null, 0]} borderBottomWidth={[null, null, '3px']}>
      {children}
    </Tabs.Trigger>
  )
}

const NavTabs = () => {
  const pathname = usePathname()
  const params = useSearchParams()

  const splitedPathname = pathname.split('/')
  const lastPathSegment = splitedPathname.at(-1)

  return (
    <Tabs.Root defaultValue='utilisateurs' value={lastPathSegment} variant='subtle' size={['lg', null, 'sm']} colorPalette='green'>
      <Tabs.List>
        <StyledTrigger value={'utilisateurs'}>
          <Link asChild unstyled>
            <NextLink href={'/administration/utilisateurs'}>Utilisateurs</NextLink>
          </Link>
        </StyledTrigger>
        <StyledTrigger value={'analyses'}>
          <Link asChild unstyled>
            <NextLink href={'/administration/analyses'}>Analyses</NextLink>
          </Link>
        </StyledTrigger>
        <StyledTrigger value={'valeurs'}>
          <Link asChild unstyled>
            <NextLink href={'/administration/valeurs'}>Tables de valeurs</NextLink>
          </Link>
        </StyledTrigger>
        {/* <StyledTrigger value={'systeme'}>
          <Link asChild unstyled>
            <NextLink href={`/administration/systeme`}>Système</NextLink>
          </Link>
        </StyledTrigger> */}
      </Tabs.List>
    </Tabs.Root>
  )
}

const Toolbar = ({ children }) => {
  const [{ y }] = useWindowScroll()

  const toolbarShadowSize = y > 70 ? 'md' : null
  // const paddingTop = y > 70 ? 2 : null

  return (
    <Flex
      // flex={1}
      position={'sticky'}
      top={'70px'}
      alignSelf={'flex-start'}
      width={'full'}
      zIndex={1001}
      shadow={[null, null, toolbarShadowSize]}
    >
      <Flex flex={1} bg='white' _dark={{ bg: 'black' }} py={1}>
        <Container maxWidth={'6xl'} py={2}>
          <HStack justifyContent='space-between' gap={2}>
            <NavTabs />
            {children}
          </HStack>

        </Container>
      </Flex>

    </Flex>

  )
}

export default Toolbar
