import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from '../../../../../../../../../lib/components/dialogs/wrappers'

import CommentDisplay from '@/app/lib/components/display/base/comment'

const TextTypeAnalyses = ({ analyses }) => {
  return analyses.map((analysis, i) => {
    const { name, results = [] } = analysis
    
    return (
      <Box key={i}>
        <Header name={name} mb={2} />
        <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2}>
        { results.map((r, i) => {
          const { id, value, eventId, specimenSequenceId, specimenSpecieName } =  r
          const label = <>{[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}{'\u00A0'}:</>
          return (
            <Row label={label} key={id}>
              <CommentDisplay w={'full'} flex={2} minRows={2} value={value} />
            </Row>
          )}) 
        }
      </VStack>
      </Box>
    )})
}

export default TextTypeAnalyses
