import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text, HStack, Separator, Fieldset, Input } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/components/ui/accordion'

import { Trigger, Content } from '../components/accordion-parts'

const SpecimenInformation = ({ specimen, onDelete }) => {
  console.debug(specimen)
  const { id, specimenNumber, specie } = specimen
  const { name: specieName, binome } = specie
  return (
    <AccordionItem key={id} value={id}>
      <Box position='relative'>
        <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
          <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton>
          <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']} onClick={onDelete}><RxTrash /></IconButton>
        </AbsoluteCenter>
        <Trigger label={`${specimenNumber} - ${specieName} (${binome})`} />
      </Box>
      <Content>
        <VStack alignItems='flex-start'>
          <Text as='h4'>Identification du spécimen</Text>
          <Separator />
          <Text as='h4'>Mesures</Text>
          <Separator />
          <Text as='h4'>Autres informations</Text>
        </VStack>
      </Content>
    </AccordionItem>
  )
}

export default SpecimenInformation

