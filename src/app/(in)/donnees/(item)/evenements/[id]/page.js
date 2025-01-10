'use client'
import { useState, useCallback, useEffect } from 'react'

import { useParams } from 'next/navigation'

import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text, HStack, Separator, Fieldset, Input } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from '@/components/ui/accordion'

// import wait from '@/utilities/wait'

import { Field } from '@/components/ui/field'

import useDialog from '@/utilities/use-dialog'

import PageSpinner from '@/components/page-spinner'

import Toolbar from '../../../(list)/evenements/components/toolbar'

import AjouterSpecimenDialog from './components/ajouter-specimen-dialog'
import AjouterAnalyseDialog from './components/ajouter-analyse-dialog'
import DetruireAnalyseDialog from './components/detruire-analyse-dialog'
import DetruireSpecimenDialog from './components/detuire-specimen-dialog'

const SectionHeading = ({ label, isSticky = false, children }) => {
  return (
    <Flex as='section' bg='green.100' color='green.600' px={5} py={3} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems='center' justifyContent='space-between' position={isSticky && 'sticky'} top={[134, null, 129]} justifySelf='flex-start' zIndex={1000}>
      <Text as='h3' userSelect='none'>{label}</Text>
      {children}
    </Flex>
  )
}

const Trigger = ({ label, ...rest }) => {
  return (
    <AccordionItemTrigger indicatorPlacement='start' bg='green.50' color='green.600' p={4} borderRadius={0} borderColor='green.300' borderTopWidth={1} {...rest}>{label}</AccordionItemTrigger>

  )
}

const Content = ({ children }) => {
  return (
    <AccordionItemContent bg='white' p={4} px={5} borderBottomWidth={0}>{children}</AccordionItemContent>
  )
}

const GeneralInformation = () => {
  return (
    <Fieldset.Root as='VStack' alignItems='flex-start'>
      <Fieldset.Legend>Identification</Fieldset.Legend>
      <Fieldset.Content gap={2}>
        <Field label={'Numéro d\'événement\u00A0:'}>
          <Input flex={4} readOnly value='303326' />
        </Field>
        <Field label={'Type d\'événement\u00A0:'}>
          <Input flex={4} readOnly value='Santé de la faune' />
        </Field>
        <Field label={'Numéro d\'identification SILAB\u00A0:'}>
          <Input flex={4} />
        </Field>
      </Fieldset.Content>
      <Separator />
      <Fieldset.Legend>Personnes impliquées</Fieldset.Legend>
      <Separator />
      <Fieldset.Legend>Description</Fieldset.Legend>
      <Separator />
      <Fieldset.Legend>Expédition des spécimens</Fieldset.Legend>
    </Fieldset.Root>
  )
}

const GeneralSpecimenInformation = () => {
  return (
    <VStack alignItems='flex-start'>
      <Text as='h4'>Identification du spécimen</Text>
      <Separator />
      <Text as='h4'>Mesures</Text>
      <Separator />
      <Text as='h4'>Autres informations</Text>
    </VStack>
  )
}

const Evenement = () => {
  const params = useParams()
  const { id: idEvenement } = params

  const [isReady, setReady] = useState(false)

  const dialogs = []

  const { ask: createSpecimen, dialog: createSpecimenDialog } = useDialog(AjouterSpecimenDialog)
  dialogs.push(createSpecimenDialog)

  const handleCreateSpecimen = useCallback(async () => {
    const result = await createSpecimen()
    if (result) {
      console.debug('Create !!!')
    }
  }, [createSpecimen])

  const { ask: createAnalysis, dialog: createAnalysisDialog } = useDialog(AjouterAnalyseDialog)
  dialogs.push(createAnalysisDialog)

  const handleCreateAnalysis = useCallback(async () => {
    const result = await createAnalysis()
    if (result) {
      console.debug('Create !!!')
    }
  }, [createAnalysis])

  const { ask: deleteAnalysis, dialog: deleteAnalysisDialog } = useDialog(DetruireAnalyseDialog)
  dialogs.push(deleteAnalysisDialog)

  const handleDeleteAnalysis = useCallback(async () => {
    const result = await deleteAnalysis()
    if (result) {
      console.debug('Delete !!!')
    }
  }, [deleteAnalysis])

  const { ask: deleteSpecimen, dialog: deleteSpecimenDialog } = useDialog(DetruireSpecimenDialog)
  dialogs.push(deleteSpecimenDialog)

  const handleDeleteSpecimen = useCallback(async () => {
    const result = await deleteSpecimen()
    if (result) {
      console.debug('Delete !!!')
    }
  }, [deleteSpecimen])

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, Math.random() * 1000)
  }, [setReady])

  if (!isReady) {
    return (
      <PageSpinner />
    )
  }

  return (
    <>
      {dialogs}

      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 8]} py={[0, 0, 4]} fontSize={['md', null, 'sm']}>

        <Flex flex={2} p={4} px={6} alignItems='stretch' bg='blue.100' position='sticky' borderColor='blue.300' borderTopWidth={1} hideBelow='md'>
          <Flex position='sticky' top={145} alignSelf='flex-start' zIndex={1000} />
        </Flex>

        <VStack flex={5} justifyContent='flex-start' alignItems='stretch' ps={[0, null, 2]} gap={[0, null, 2]}>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label={`Événement no ${idEvenement}`} isSticky>
              <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']}><RxTrash /></IconButton>
            </SectionHeading>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={['general']}>
              <AccordionItem value='general'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='Informations générales' />
                </Box>
                <Content>
                  <GeneralInformation />
                </Content>
              </AccordionItem>
              <AccordionItem value='geo'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='Localisation géographique' />
                </Box>
                <Content>Localisation géographique</Content>
              </AccordionItem>
              <AccordionItem value='labo'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='Laboratoire' />
                </Box>
                <Content>Laboratoire</Content>
              </AccordionItem>
            </AccordionRoot>

          </VStack>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label='Spécimens' isSticky>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={handleCreateSpecimen}><RxPlus /></IconButton>
            </SectionHeading>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>
              <AccordionItem value='s0001'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                    <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']} onClick={handleDeleteSpecimen}><RxTrash /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='303307.1 - Raton laveur' />
                </Box>
                <Content>
                  <GeneralSpecimenInformation />
                </Content>
              </AccordionItem>
            </AccordionRoot>
          </VStack>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label='Analyses'>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={handleCreateAnalysis}><RxPlus /></IconButton>
            </SectionHeading>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]}>

              <AccordionItem value='dsc'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                    <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']} onClick={handleDeleteAnalysis}><RxTrash /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='Distemper canin (PCR)' />
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
