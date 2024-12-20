'use client'
import { useRouter } from 'next/navigation'

import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, Button, IconButton, HStack, Link } from '@chakra-ui/react'

import { RxArrowLeft, RxFileText  } from 'react-icons/rx'
import { useCallback } from 'react'

const ReportButton = () => {
  return (
    <>
      <Button size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} display={['none', null, 'inherit']}><RxFileText />Rapport</Button>
      <IconButton size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} aria-label={'Rapport'} display={['inherit', null, 'none']}><RxFileText /></IconButton>    </>
  )
}

const BackButton = () => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.back()
  }, [router])
  return (
    <IconButton size={['md', null, 'sm']} rounded='full' variant={'subtle'} colorPalette={'blue'} aria-label={'Retour'} onClick={handleClick}><RxArrowLeft /></IconButton>
  )
}

const Toolbar = () => {
  const [{ x, y }, scrollTo] = useWindowScroll()
  const toolbarShadowSize = y > 70 ? 'md' : null

  return (
    <Flex
      flex={0}
      position={'sticky'}
      top={'70px'}
      alignSelf={'flex-start'}
      width={'full'}
      zIndex={1}
      shadow={toolbarShadowSize}
    >
      <Flex flex={1} bg={'white'} py={1}>
        <Container maxWidth={'6xl'} py={2} >
          <HStack justifyContent={'space-between'} gap={2}>
            <HStack justifyContent={'space-between'} gap={2}>
              <BackButton />
            </HStack>
            <HStack justifyContent={'space-between'} gap={1}>
              <ReportButton />
            </HStack>
          </HStack>
        </Container>
      </Flex>
    </Flex>
  )

}

export default Toolbar