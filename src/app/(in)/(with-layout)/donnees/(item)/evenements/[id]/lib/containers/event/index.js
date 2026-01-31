'use client'
import { useCallback, useEffect, useState } from 'react'

import { Flex, Box, Container, AbsoluteCenter, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { RxPlus, RxPencil1, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import GeneralInfosSection from './general-infos'
import LaboratoireSection from '../laboratory'
import LocalisationSection from '../location'

import SpecimenSection from '../specimen'
import AnalysisGroupSection from '../analysis-group'

// import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddSpecimenButton from '../add-specimen-dialog/add-specimen-button'
import AddAnalysisButton from '../add-analysis-group-dialog/add-analysis-button'

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
  // canUserDeleteEvent,
  // canUserReopenEvent,
  canUserAddSpecimen,
  // canUserDeleteSpecimens,
  canUserEditSpecimens,
  canUserAddAnalysis,
  // canUserDeleteAnalyses,
  canUserEditAnalyses
}) => {
  const [activePanels, setActivePanels] = useState(['general'])

  const handleToggleActiveSection = useCallback(e => {
    setActivePanels(e.value)
  }, [])

  const { id: eventId } = event
  const { specimens = [] } = event
  const { analysisGroups = [] } = event

  const showEditEventSectionButton = canUserEditEventSection // activePanels.includes('general') && canUserEditEventSection
  const showEditLocationSectionButton = canUserEditEventSection // activePanels.includes('location') && canUserEditEventSection
  const showEditLaboratorySectionButton = canUserEditEventSection // activePanels.includes('laboratory') && canUserEditEventSection

  return (
    <>
      <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
        <SectionHeading label={`Événement no ${eventId}`} isSticky h={'50px'} />
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
              <SpecimenSection key={id} specimen={s} canEdit={canUserEditSpecimens} />
            )
          })}
        </AccordionRoot>
      </VStack>
      
      <VStack alignItems={'stretch'} fontSize={['md', null, 'sm']} gap={0}>
        <SectionHeading label={'Analyses'} isSticky>
          { canUserAddAnalysis && <AddAnalysisButton eventId={eventId}  /> }
        </SectionHeading>
        <AccordionRoot multiple size={['md', null, 'sm']} defaultValue={[]} lazyMount>
          {analysisGroups.map(ag => {
            const { id } = ag
            return (
              <AnalysisGroupSection key={id} analysisGroup={ag} canEdit={canUserEditAnalyses} />
            )
          })}
        </AccordionRoot>
      </VStack>
    </>
  )
}

export default Event
