'use client'

import NextLink from 'next/link'
import { usePathname, useParams  } from 'next/navigation'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, AbsoluteCenter, IconButton, Text, HStack } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"

import Toolbar from '../components/toolbar'

const Trigger = ({ label }) => {
  return (
    <AccordionItemTrigger indicatorPlacement={'start'} bg={'green.50'} color={'green.600'} p={4} ps={3} pe={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>{label}</AccordionItemTrigger>

  )
}

const Content = ({ children }) => {
  return (
    <AccordionItemContent bg={'white'} p={4} px={5} borderBottomWidth={0}>{children}</AccordionItemContent>
  )
}

const Evenement = () => {
  const params = useParams()
  const { id: idEvenement } = params
  // console.debug(params)
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Flex flex={2} p={4} px={6} alignItems={'stretch'} bg={'blue.100'} position={'sticky'} top={0} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'} />
        <VStack flex={5} justifyContent={'flex-start'} alignItems={'stretch'} ps={[0, null, 2]} gap={[0, null, 2]}>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>

            <Flex bg={'green.100'} color={'green.600'} px={5} py={3} fontWeight={500} borderColor={'green.300'} borderTopWidth={1} alignItems={'center'} justifyContent={'space-between'}>
              <Text>Événement no {idEvenement}</Text>
              <IconButton colorPalette={'green'} variant={'solid'} rounded={'full'} size={['xs']}><RxPlus /></IconButton>
            </Flex>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={['general']}>  
              <AccordionItem value={'general'}>
                <Box position={'relative'}>
                  <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5}>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label={'Informations générales'} />
                </Box>
                <Content>Informations générales</Content>
              </AccordionItem>
              <AccordionItem value={'geo'}>
                <Box position={'relative'}>
                  <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5}>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label={'Localisation géographique'} />
                </Box>
                <Content>Localisation géographique</Content>
              </AccordionItem>
              <AccordionItem value={'labo'}>
                <Box position={'relative'}>
                  <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5}>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label={'Laboratoire'} />
                </Box>
                <Content>Laboratoire</Content>
              </AccordionItem>
            </AccordionRoot>

          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            
            <Flex bg={'green.100'} color={'green.600'} px={5} py={3} fontWeight={500} borderColor={'green.300'} borderTopWidth={1} alignItems={'center'} justifyContent={'space-between'}>
            <Text>Spécimens</Text>
              <IconButton colorPalette={'green'} variant={'solid'} rounded={'full'} size={['xs']}><RxPlus /></IconButton>
            </Flex>
            
            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>
              <AccordionItem value={'s0001'}>
              <Box position={'relative'}>
                  <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5}>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxPencil1 /></IconButton>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxTrash /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label={'303307.1 - Raton laveur'} />
                </Box>
                <Content>303307.1 - Raton laveur</Content>
                {/* <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>303307.1 - Raton laveur</AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent> */}
              </AccordionItem>
            </AccordionRoot>
          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>

            <Flex bg={'green.100'} color={'green.600'} px={5} py={3} fontWeight={500} borderColor={'green.300'} borderTopWidth={1} alignItems={'center'} justifyContent={'space-between'}>
              <Text>Analyses</Text>
              <IconButton colorPalette={'green'} variant={'solid'} rounded={'full'} size={['xs']}><RxPlus /></IconButton>
            </Flex>
          
            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>

              <AccordionItem value={'dsc'}>
                <Box position={'relative'}>
                  <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={4}>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxPencil1 /></IconButton>
                    <IconButton colorPalette={'green'} variant={'outline'} rounded={'full'} size={['xs']}><RxTrash /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label={'Distemper canin (PCR)'} />
                </Box>
                <Content>Distemper canin (PCR)</Content>
              </AccordionItem>

            </AccordionRoot>
          </VStack>

        </VStack>
      </Flex>
    </>
  )
}

export default Evenement
