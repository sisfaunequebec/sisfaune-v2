'use client'
import { useCallback, useEffect, useState } from 'react'

import { Flex, Box, Container, AbsoluteCenter, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { RxPlus, RxPencil1, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import { Content, Trigger } from '../components/accordion-parts'

import useDialog from '@/utilitaires/use-dialog'

import Toolbar from '@/app/(in)/(with-layout)/donnees/(list)/evenements/lib/components/toolbar'

import DeleteEventButton from '../components/delete-event-button'

import InfosGeneralesSection from './infogenerales'
import LaboratoireSection from './laboratoire'
import LocalisationSection from './localisation'

import SpecimenInformationSection from './specimen'

const SectionHeading = ({ label, isSticky = false, children }) => {
  return (
    <Flex as='section' bg='green.100' color='green.600' px={5} py={2} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems='center' justifyContent='space-between' position={isSticky && 'sticky'} top={[135, null, 130]} justifySelf='flex-start' zIndex={1000}>
      <Text as='h3' userSelect='none'>{label}</Text>
      {children}
    </Flex>
  )
}

const Event = ({ 
  event,
  canDeleteEvent,
  canUserAddSpecimen,
  canUserDeleteSpecimens,
  canUserEditSpecimens,
  canUserAddAnalysis,
  canUserDeleteAnalyses,
  canUserEditAnalyses
}) => {
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

  const { id: eventId } = event
  const { specimens } = event

  return (
    <>
      <Toolbar />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Flex position='sticky' flex={2} h='calc(100vh - 162px)' overflowY='auto' top={154} p={3} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} borderBottomWidth={1} hideBelow='md' />

        <VStack flex={5} ps={[0, null, 2]} justifyContent='flex-start' alignItems='stretch' gap={[0, null, 2]}>
          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={`Événement no ${eventId}`} isSticky>
              <DeleteEventButton eventId={eventId} visibility={!canDeleteEvent && 'hidden'} />
            </SectionHeading>
            <AccordionRoot size={['md', null, 'sm']} multiple value={activePanel} onValueChange={handleToggleActiveSection} lazyMount>
              {/* <InfosGeneralesSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} />
              <LocalisationSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} />
              <LaboratoireSection event={event} onToggleEditing={handleToggleEditingSection} editingSection={editingSection} /> */}
            </AccordionRoot>
          </VStack>
          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label='Spécimens' isSticky>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={null} visibility={!canUserAddSpecimen && 'hidden'}><RxPlus /></IconButton>
            </SectionHeading>
            {/* <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
              {event.specimens.map(s => {
                const { id } = s
                return (
                  <SpecimenInformationSection key={id} specimen={s} onToggleEditing={canUserEditSpecimens ? handleToggleEditingSection : null} editingSection={editingSection} onDelete={canUserDeleteSpecimens} />
                )
              })}
            </AccordionRoot> */}
          </VStack>
          <VStack alignItems='stretch' fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label='Analyses'>
              <IconButton colorPalette='green' variant='solid' rounded='full' size={['xs']} onClick={null} visibility={!canUserAddAnalysis && 'hidden'}><RxPlus /></IconButton>
            </SectionHeading>
            {/* <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
              <AccordionItem value='dsc'>
                <Box position='relative'>
                  <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
                    <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
                    <IconButton colorPalette='red' variant='subtle' rounded='full' size={['xs']} onClick={null}><RxTrash /></IconButton>
                  </AbsoluteCenter>
                  <Trigger label='Distemper canin (PCR)' />
                </Box>
                <Content>Distemper canin (PCR)</Content>
              </AccordionItem>
            </AccordionRoot> */}
          </VStack>

        </VStack>
      </Flex>
    </>
  )
}

export default Event
