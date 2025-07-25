'use client'
import { useCallback, useEffect, useState } from 'react'

import { Flex, Box, Container, AbsoluteCenter, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { RxPlus, RxPencil1, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import { Content, Trigger } from '../components/accordion-parts'

import useDialog from '@/utils/use-dialog'

import Toolbar from '@/app/(in)/(with-layout)/donnees/(list)/evenements/lib/components/toolbar'

import DeleteEventButtonOld from '../components/delete-event-button'

import InfosGeneralesSection from './infogenerales'
import LaboratoireSection from './laboratory'
import LocalisationSection from './location'

import SpecimenInformationSection from './specimen'

import ResponsiveButton from '@/app/lib/components/responsive-button'

const SectionHeading = ({ label, isSticky = false, children }) => {
  return (
    <Flex as='section' bg='green.100' color='green.600' px={4} py={2} pe={2} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems='center' justifyContent='space-between' position={isSticky && 'sticky'} top={[135, null, 130]} justifySelf='flex-start' zIndex={1000}>
      <Text as='h3' userSelect='none'>{label}</Text>
      {children}
    </Flex>
  )
}

const Event = ({ 
  event,
  canUserEditEventSection,
  canDeleteEvent,
  canUserAddSpecimen,
  canUserDeleteSpecimens,
  canUserEditSpecimens,
  canUserAddAnalysis,
  canUserDeleteAnalyses,
  canUserEditAnalyses
}) => {
  const [activePanel, setActivePanel] = useState(['general'])

  const handleToggleActiveSection = useCallback(e => {
    setActivePanel(e.value)
  }, [])

  const { id: eventId } = event
  // const { specimens } = event

  const specimens = [
    { id: 1 },
    { id: 2 }
  ]

  return (
    <>
      <Toolbar canDeleteEvent={canDeleteEvent} />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Flex position={'sticky'} flex={2} h={'calc(100vh - 162px)'} overflowY={'auto'} top={154} p={3} px={6} alignItems={'stretch'} bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor={'blue.300'} borderTopWidth={1} borderBottomWidth={1} hideBelow={'md'} />

        <VStack flex={5} ps={[0, null, 2]} justifyContent={'flex-start'} alignItems={'stretch'} gap={[0, null, 0]}>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={`Événement no ${eventId}`} isSticky>
              <DeleteEventButtonOld eventId={eventId} visibility={'hidden'} />
            </SectionHeading>
            <AccordionRoot size={['md', null, 'sm']} multiple value={activePanel} onValueChange={handleToggleActiveSection}>
              <InfosGeneralesSection event={event} canEdit={canUserEditEventSection} />
              <LocalisationSection event={event} canEdit={canUserEditEventSection} />
              <LaboratoireSection event={event} canEdit={canUserEditEventSection} />
            </AccordionRoot>
          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={'Spécimens'} isSticky>
              { canUserAddSpecimen && <ResponsiveButton colorPalette={'green'} variant={'solid'} size={'sm'} label={'Ajouter'} icon={<RxPlus />} me={[2, null, 1]} /> }
            </SectionHeading>
            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
              {specimens.map(s => {
                const { id } = s
                return (
                  <SpecimenInformationSection key={id} specimen={s} onDelete={canUserDeleteSpecimens} canEdit={canUserEditSpecimens} canDelete={canUserDeleteSpecimens}  />
                )
              })}
            </AccordionRoot>
          </VStack>
          
          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={'Analyses'} isSticky>
              { canUserAddAnalysis && <ResponsiveButton colorPalette={'green'} variant={'solid'} size={'sm'} label={'Ajouter'} icon={<RxPlus />} me={[2, null, 1]} /> }
            </SectionHeading>
          </VStack>

        </VStack>
      </Flex>
    </>
  )
}

export default Event
