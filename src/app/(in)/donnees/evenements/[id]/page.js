import NextLink from 'next/link'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs } from '@chakra-ui/react'

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"

import Toolbar from '../components/toolbar'

const Evenement = async () => {
  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>
        <Flex flex={2} p={4} px={6}  alignItems={'stretch'} bg={'blue.100'} position={'sticky'} top={0} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'} />
        <VStack flex={5} justifyContent={'flex-start'} alignItems={'stretch'} ps={[0, null, 2]}>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <Flex bg={'green.100'} color={'green.600'} px={6} py={4} fontWeight={500} borderColor={'green.300'} borderTopWidth={1}>Événement</Flex>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={['general']}>
              <AccordionItem value={'general'}>
                <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>Informations générales</AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent>
              </AccordionItem>
              <AccordionItem value={'geo'}>
                <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>Localisation géographique</AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent>
              </AccordionItem>
              <AccordionItem value={'labo'}>
                <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>Laboratoire</AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <Flex bg={'green.100'} color={'green.600'} px={6} py={4} fontWeight={500} borderColor={'green.300'} borderTopWidth={1}>Spécimens</Flex>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>
              <AccordionItem value={'s0001'}>
                <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>303307.1 - Raton laveur</AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <Flex bg={'green.100'} color={'green.600'} px={6} py={4} fontWeight={500} borderColor={'green.300'} borderTopWidth={1}>Analyses</Flex>
          
            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>
              <AccordionItem value={'dsc'}>
                <AccordionItemTrigger bg={'green.50'} color={'green.600'} p={4} px={6} borderRadius={0} borderColor={'green.300'} borderTopWidth={1}>Distemper canin (PCR)
                </AccordionItemTrigger>
                <AccordionItemContent bg={'white'} p={4} px={6} borderBottomWidth={0}>Content</AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>

        </VStack>
      </Flex>
    </>
  )
}

export default Evenement
