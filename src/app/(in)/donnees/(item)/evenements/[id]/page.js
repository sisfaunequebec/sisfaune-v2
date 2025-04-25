'use client'
import { useState, useCallback, useEffect } from 'react'

import { useParams } from 'next/navigation'

import getUser from '@/lib/auth/get-user'
import getEvent from './lib/actions/get-event'

import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text, HStack, Separator, Fieldset, Input, EmptyState } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash, RxExclamationTriangle } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from './lib/components/accordion-parts'

// import { Field } from '@/components/ui/field'

import useDialog from '@/utilitaires/use-dialog'

import PageSpinner from '@/app/lib/components/page-spinner'

import Toolbar from '../../../(list)/evenements/lib/components/toolbar'

import DeleteEventButton from './lib/components/delete-event-button'

import AddSpecimenDialog from '../../../(list)/lib/containers/add-specimen-dialog'
import AddAnalysisDialog from './lib/containers/add-analysis-dialog'

// import AjouterAnalyseDialog from './lib/components/ajouter-analyse-dialog'
import DetruireAnalyseDialog from './lib/components/detruire-analyse-dialog'
import DetruireSpecimenDialog from './lib/components/detuire-specimen-dialog'

import InfosGeneralesSection from './lib/containers/infogenerales'
import LocalisationSection from './lib/containers/localisation'
import LaboratoireSection from './lib/containers/laboratoire'

import SpecimenInformationSection from './lib/containers/specimen'

const Unauthorized = () => {
  return (
    <EmptyState.Root size={['md']} p={0} alignSelf={'center'} justifySelf={'center'}>
      <EmptyState.Content gap={4}>
        <EmptyState.Indicator>
          <RxExclamationTriangle />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title fontSize={['2xl', null, 'xl']}>Désolé !</EmptyState.Title>
          <EmptyState.Description fontSize={['lg', null, 'md']}>
            Cet événement est introuvable ou vous n&apos;êtes pas autorisé à le consulter
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

const SectionHeading = ({ label, isSticky = false, children }) => {
  return (
    <Flex as='section' bg='green.100' color='green.600' px={5} py={3} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems='center' justifyContent='space-between' position={isSticky && 'sticky'} top={[135, null, 130]} justifySelf='flex-start' zIndex={1000}>
      <Text as='h3' userSelect='none'>{label}</Text>
      {children}
    </Flex>
  )
}

const Evenement = () => {
  const params = useParams()
  const { id } = params

  const eventId = parseInt(id, 10)

  const [event, setEvent] = useState(undefined)
  const [activePanel, setActivePanel] = useState(['general'])

  const [editingSection, setEditingSection] = useState(null)

  const handleToggleEditingSection = useCallback(section => {
    // console.debug(editingSection, section)
    if (editingSection) {
      if (editingSection === section) {
        // setActivePanel([section])
        setEditingSection(null)
      } else {

      }
    } else {
      setActivePanel([section])
      setEditingSection(section)
    }
  }, [editingSection])

  const handleToggleActiveSection = useCallback(e => {
    setActivePanel(e.value)
  }, [])

  const dialogs = []

  // const { ask: deleteEvent, dialog: deleteEventDialog } = useDialog(DetruireEvenementDialog)
  // dialogs.push(deleteEventDialog)

  // const handleDeleteEvent = useCallback(async () => {
  //   const result = await deleteEvent({ eventId: idEvenement })
  //   if (result) {
  //     console.debug('Delete !!!')
  //   }
  //   // console.log(result)
  // }, [idEvenement, deleteEvent])

  useEffect(() => {
    const loadEvent = async (eventId) => {
      const user = await getUser()
      const event = await getEvent(eventId, { user })
      console.debug('loadEvent', event)
      setEvent(event)
    }
    loadEvent(eventId)
  }, [eventId])

  const { ask: createSpecimen, dialog: createSpecimenDialog } = useDialog(AddSpecimenDialog)
  dialogs.push(createSpecimenDialog)

  const handleCreateSpecimen = useCallback(async () => {
    const result = await createSpecimen()
    if (result) {
      console.debug('Create !!!')
    }
  }, [createSpecimen])

  const { ask: createAnalysis, dialog: createAnalysisDialog } = useDialog(AddAnalysisDialog)
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

  if (event === undefined) {
    return (
      <PageSpinner />
    )
  }

  if (event === null) {
    return (
      <AbsoluteCenter><Unauthorized /></AbsoluteCenter>
    )
  }

  const { specimens } = event

  return (
    <>
      {dialogs}

      <Toolbar />

      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>

        <Flex position='sticky' flex={2} h='calc(100vh - 162px)' overflowY='auto' top={154} p={3} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} borderBottomWidth={1} hideBelow='md' />

        <VStack flex={5} ps={[0, null, 2]} justifyContent='flex-start' alignItems='stretch' gap={[0, null, 2]}>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label={`Événement no ${eventId}`} isSticky>
              <DeleteEventButton eventId={eventId} />
            </SectionHeading>

            <AccordionRoot size={['md', null, 'sm']} multiple value={activePanel} onValueChange={handleToggleActiveSection} lazyMount>

              <InfosGeneralesSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} />
              <LocalisationSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} />
              <LaboratoireSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} />

            </AccordionRoot>

          </VStack>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label='Spécimens' isSticky>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={handleCreateSpecimen}><RxPlus /></IconButton>
            </SectionHeading>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
              {specimens.map(s => {
                const { id } = s
                // console.debug(id)
                return (
                  <SpecimenInformationSection key={id} specimen={s} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} onDelete={handleDeleteSpecimen} />
                )
              })}
            </AccordionRoot>
          </VStack>

          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>

            <SectionHeading label='Analyses'>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={handleCreateAnalysis}><RxPlus /></IconButton>
            </SectionHeading>

            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>

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
