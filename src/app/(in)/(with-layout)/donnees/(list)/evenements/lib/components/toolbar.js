/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import { useCallback } from 'react'

import { useRouter, useParams } from 'next/navigation'

import { useWindowScroll } from '@uidotdev/usehooks'

import Link from 'next/link'

import { Flex, Container, Button, IconButton, HStack } from '@chakra-ui/react'
import { RxArrowLeft, RxFileText } from 'react-icons/rx'

import ToolbarWrapper from '@/app/lib/components/toolbar-wrapper'
import ResponsiveButton from '@/app/lib/components/responsive-button'

const ReportButton = ({ id }) => {
  return (
    <ResponsiveButton label={'Rapport'} variant={'solid'} colorPalette={'blue'} icon={<RxFileText />} as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} />
    // <>
    //   <Button as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} size={['md', null, 'sm']} rounded={'full'} variant={'solid'} colorPalette={'blue'} display={['none', null, 'inherit']}><RxFileText />Rapport</Button>
    //   <IconButton as={Link} href={`/donnees/evenements/${id}/rapport`} target={'_blank'} size={['md', null, 'sm']} rounded={'full'} variant={'solid'} colorPalette={'blue'} aria-label={'Rapport'} display={['inherit', null, 'none']}><RxFileText /></IconButton>
    // </>
  )
}

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <ResponsiveButton label={'Retour à la liste'} variant={'subtle'} colorPalette={'green'} icon={<RxArrowLeft />} onClick={handleGoBack} />
  )
}

const Toolbar = () => {
  const params = useParams()
  const { id: idEvenement } = params

  // const [{ y = 0 }] = useWindowScroll()
  // const toolbarShadowSize = y > 70 ? 'md' : null

  return (
    <ToolbarWrapper>
      <HStack justifyContent={'space-between'} gap={2}>
        <HStack justifyContent={'space-between'} gap={2}>
          <BackButton />
        </HStack>
        <HStack justifyContent={'space-between'} gap={1}>
          <ReportButton id={idEvenement} />
        </HStack>
      </HStack>
    </ToolbarWrapper>
  )
}

export default Toolbar
