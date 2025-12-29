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
import EditAnalysisGroupButton from './edit-analysis-group-button';
import DeleteAnalysisGroupButton from '../../components/delete-analysis-group-button'

// import Fields from '@/app/lib/components/display/fields'

import ValueTypeAnalyses from './value-type-analysis'
import TextTypeAnalyses from './text-type-analysis'


// import SelectDisplay from '@/app/lib/components/display/base/select'
// import NumberDisplay from '@/app/lib/components/display/base/number'
// import DateDisplay from '@/app/lib/components/display/base/date'
// import CommentDisplay from '@/app/lib/components/display/base/comment'

const AnalysisGroupSection = ({ analysisGroup, canEdit = false }) => {
  const { id: analysisGroupId, name } = analysisGroup

  return (
    <AccordionItem key={analysisGroupId} value={analysisGroupId}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={999} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2} gap={0.5}>
          { canEdit && <DeleteAnalysisGroupButton analysisGroup={analysisGroup} /> }
          { canEdit && <EditAnalysisGroupButton analysisGroup={analysisGroup} /> }
        </AbsoluteCenter>
        <Trigger label={`${name}`} h={'46px'} />
      </Box>
      <Content id={`#analysis_group_id_${analysisGroupId}`}>
        <AnalysisGroup analysisGroup={analysisGroup} />
      </Content>
    </AccordionItem>
  )
}

const AnalysisGroup = ({ analysisGroup }) => {
  const { analyses = [] } = analysisGroup 

  const valueTypeAnalyses = analyses.filter(an => an.resultTypeId !== 3)
  const textTypeAnalyses = analyses.filter(an => an.resultTypeId === 3)

  return (
    <>
      <ValueTypeAnalyses analyses={valueTypeAnalyses} />
      <TextTypeAnalyses analyses={textTypeAnalyses} />
    </>
  )
}

export default AnalysisGroupSection
