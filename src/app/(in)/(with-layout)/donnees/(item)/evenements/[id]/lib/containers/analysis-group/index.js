import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import { PiArrowBendLeftDownBold } from "react-icons/pi";

import { Tooltip } from '@/app/lib/components/ui/tooltip'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

// import { numericFormatter } from 'react-number-format'

import { Trigger, Content } from '../../components/accordion-parts'

// import EditSpecimenButton from './edit-specimen-button'
import DeleteAnalysisGroupButton from '../../components/delete-analysis-group-button'

import Fields from '@/app/lib/components/display/fields'

import SelectDisplay from '@/app/lib/components/display/base/select'
import NumberDisplay from '@/app/lib/components/display/base/number'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

const AnalysisGroupSection = ({ analysisGroup, canEdit = false }) => {
  const { id: analysisGroupId, name } = analysisGroup

  return (
    <AccordionItem key={analysisGroupId} value={analysisGroupId}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={999} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2} gap={0.5}>
          {/* { canEdit && <DeleteAnalysisButton analysis={analysis} /> } */}
          { canEdit && <DeleteAnalysisGroupButton analysisGroup={analysisGroup} /> }
        </AbsoluteCenter>
        <Trigger label={`${name}`} h={'46px'} />
      </Box>
      <Content id={`#analysis_group_id_${analysisGroupId}`}>
        <AnalysisGroup analysisGroup={analysisGroup} />
      </Content>
    </AccordionItem>
  )
}

const ValueTypeAnalysisHeader = ({ analysis }) => {
  const { results = [] } = analysis

  return (
    <>
      <ChakraField.Root justifyContent={'stretch'}>
        <Flex direction={'row'} alignItems={'center'}w={'full'} >
        <ChakraField.Label fontWeight={'medium'} fontSize={['md', null, 'sm']} color={'gray.600'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
            {'\u00A0'}
        </ChakraField.Label>
          <HStack w={'full'} flex={2} gap={2} justifyContent={'flex-between'}>
            { results.map((r, i) => {
              const { eventId, specimenSequenceId, specimenSpecieName } = r
              return (
                <Flex flex={1} borderRadius={'md'} px={3} ps={1} py={3} lineHeight={'1.1rem'} key={i}>
                  <Icon size={'sm'} position={'relative'} top={2} me={1}>
                    <PiArrowBendLeftDownBold />
                  </Icon>
                  {[eventId, specimenSequenceId].join('.')} - {specimenSpecieName}
                  {/* {`Spécimen ${eventId}.${specimenSequenceId}`} */}
                </Flex>
              )
            }) }
          </HStack>
        </Flex>
      </ChakraField.Root>
    </>
  )
}

const TextTypeAnalysisHeader = ({ analysis }) => {
  const { name, results = [] } = analysis

  return (
    <>
      <ChakraField.Root justifyContent={'stretch'}>
        <Flex direction={'row'} alignItems={'center'} w={'full'} fontWeight={'medium'}>
        <ChakraField.Label fontWeight={'medium'} fontSize={['md', null, 'sm']} color={'gray.600'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
            {name}{'\u00A0'}
          </ChakraField.Label>  
        </Flex>
      </ChakraField.Root>
    </>
  )
}

const ValueTypeAnalyses = ({ analyses }) => {
  return analyses.map((analysis, i) => {
    const { name, results = [] } = analysis
    return (
      <>
        { i === 0 &&<ValueTypeAnalysisHeader analysis={analysis} /> }
        <ValueTypeAnalysis analysis={analysis} />
      </>
    )})
}

const ValueTypeAnalysis = ({ analysis }) => {
  const { name, results = [] } = analysis
  return (
    <>
      <ChakraField.Root justifyContent={'stretch'}>
        <Flex direction={'row'} w={'full'} alignItems={'flex-start'}>
          <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={0} lineHeight={'shorter'}>
            {name}{'\u00A0'}:
          </ChakraField.Label>
          <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
            { results.map((r, i) => {
              const { id, value, unit } =  r
              return (
                <NumberDisplay value={value} key={id} suffix={unit} />
              )
            })}
          </HStack>
        </Flex>
      </ChakraField.Root>
    </>
  )
}

const TextTypeAnalyses = ({ analyses }) => {
  return analyses.map((analysis, i) => {
    const { name, results = [] } = analysis
    return (
      <>
        <TextTypeAnalysis analysis={analysis} />
      </>
    )})
}

const TextTypeAnalysis = ({ analysis }) => {
  const { results = [] } = analysis
  return (
    <>
      <TextTypeAnalysisHeader analysis={analysis} />
      <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'}>
        { results.map((r, i) => {
          const { id, value, eventId, specimenSequenceId, specimenSpecieName } =  r
          // console.debug('TextTypeAnalysis', r)
          return (
            <ChakraField.Root justifyContent={'stretch'} key={id}>
              <Flex direction={'row'} w={'full'} alignItems={'flex-start'}>
                <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={0} lineHeight={'shorter'}>
                  {[eventId, specimenSequenceId].join('.')} - {specimenSpecieName}{'\u00A0'}:
                </ChakraField.Label>
                <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
                  <CommentDisplay value={value} w={'full'} flex={2} minRows={2} />
                </HStack>
              </Flex>
            </ChakraField.Root>   
          )
        }) }
      </VStack>
    </>
  )
} 

const AnalysisGroup = ({ analysisGroup }) => {
  const { analyses = [] } = analysisGroup 

  const valueTypeAnalyses = analyses.filter(an => an.resultTypeId !== 3)
  const textTypeAnalyses = analyses.filter(an => an.resultTypeId === 3)

  return (
    <VStack flex={1} alignItems={'stretch'} w={'full'}>
      <ValueTypeAnalyses analyses={valueTypeAnalyses} />
      <TextTypeAnalyses analyses={textTypeAnalyses} />
    </VStack>
  )
}

export default AnalysisGroupSection
