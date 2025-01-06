'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useWindowScroll } from '@uidotdev/usehooks'

import Link from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, Button, IconButton, HStack } from '@chakra-ui/react'
import { RxArrowLeft, RxFileText  } from 'react-icons/rx'

const ReportButton = ({ id }) => {
  return (
    <>
      <Button as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} display={['none', null, 'inherit']}><RxFileText />Rapport</Button>
      <IconButton as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} size={['md', null, 'sm']} rounded='full' variant={'solid'} colorPalette={'blue'} aria-label={'Rapport'} display={['inherit', null, 'none']}><RxFileText /></IconButton>
    </>
  )
}

const BackButton = () => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <Button size={['md', null, 'sm']} rounded='full' variant={'subtle'} colorPalette={'blue'} display={['none', null, 'inherit']} onClick={handleClick}><RxArrowLeft />Retour à la liste</Button>
      <IconButton size={['md', null, 'sm']} rounded='full' variant={'subtle'} colorPalette={'blue'} aria-label={'Retour'} display={['inherit', null, 'none']} onClick={handleClick}><RxArrowLeft /></IconButton>
    </>
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
      zIndex={1001}
      shadow={[null, null, toolbarShadowSize]}
    >
      <Flex flex={1} bg={'white'} py={1}>
        <Container maxWidth={'6xl'} py={2} >
          <HStack justifyContent={'space-between'} gap={2}>
            <HStack justifyContent={'space-between'} gap={2}>
              <BackButton />
            </HStack>
            <HStack justifyContent={'space-between'} gap={1}>
              <ReportButton id={'test'} />
            </HStack>
          </HStack>
        </Container>
      </Flex>
    </Flex>
  )

}

export default Toolbar