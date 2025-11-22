'use client'
import { useCallback, useEffect, useState } from 'react'

import { Flex, Box, Container, AbsoluteCenter, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { RxPlus, RxPencil1, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import { Content, Trigger } from '../../components/accordion-parts'

import useDialog from '@/utils/use-dialog'

import Toolbar from '@/app/(in)/(with-layout)/donnees/(list)/evenements/lib/components/toolbar'

import DeleteEventButtonOld from '../../components/delete-event-button'

import GeneralInfosSection from './general-infos'
import LaboratoireSection from '../laboratory'
import LocalisationSection from '../location'

import SpecimenSection from '../specimen'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddSpecimenButton from '../add-specimen-dialog/add-specimen-button'

const SectionHeading = ({ label, isSticky = false, children }) => {
  return (
    <Flex as={'section'} bg={'green.100'} color={'green.600'} px={4} py={2} pe={2} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems={'center'} justifyContent={'space-between'} position={isSticky && 'sticky'} top={[135, null, 130]} justifySelf={'flex-start'} zIndex={1001} h={'46px'}>
      <Text as={'h3'} userSelect={'none'}>{label}</Text>
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
  const [activePanels, setActivePanels] = useState(['general'])

  // console.debug('Event', event)

  const handleToggleActiveSection = useCallback(e => {
    setActivePanels(e.value)
  }, [])

  const { id: eventId } = event
  const { specimens = [] } = event

  const showEditEventSectionButton = canUserEditEventSection // activePanels.includes('general') && canUserEditEventSection
  const showEditLocationSectionButton = canUserEditEventSection // activePanels.includes('location') && canUserEditEventSection
  const showEditLaboratorySectionButton = canUserEditEventSection // activePanels.includes('laboratory') && canUserEditEventSection

  return (
    <>
      <Toolbar canDeleteEvent={canDeleteEvent} />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} fontSize={['md', null, 'sm']} zIndex={999}>
        <Flex position={'sticky'} flex={2} h={'calc(100vh - 131px)'} overflowY={'auto'} top={130} p={3} px={6} alignItems={'stretch'} bg={'blue.100'} _dark={{ bg: 'blue.900' }} borderColor={'blue.300'} borderTopWidth={1} borderBottomWidth={1} hideBelow={'md'} />

        <VStack flex={5} ps={[0, null, 2]} justifyContent={'flex-start'} alignItems={'stretch'} gap={[0, null, 0]}>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={`Événement no ${eventId}`} isSticky h={'50px'}>
              {/* <DeleteEventButtonOld eventId={eventId} visibility={'hidden'} /> */}
            </SectionHeading>
            <AccordionRoot size={['md', null, 'sm']} multiple value={activePanels} onValueChange={handleToggleActiveSection}>
              <GeneralInfosSection event={event} canEdit={showEditEventSectionButton} />
              <LocalisationSection event={event} canEdit={showEditLocationSectionButton} />
              <LaboratoireSection event={event} canEdit={showEditLaboratorySectionButton} />
            </AccordionRoot>
          </VStack>

          <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
            <SectionHeading label={'Spécimens associés à l\'événement'} isSticky>
              { canUserAddSpecimen && <AddSpecimenButton eventId={eventId}  /> }
            </SectionHeading>
            <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
              {specimens.map(s => {
                const { id } = s
                return (
                  <SpecimenSection key={id} specimen={s} onDelete={canUserDeleteSpecimens} canEdit={canUserEditSpecimens} canDelete={canUserDeleteSpecimens}  />
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
