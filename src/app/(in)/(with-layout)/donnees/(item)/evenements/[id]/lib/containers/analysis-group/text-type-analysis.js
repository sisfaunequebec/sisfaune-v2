import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from './wrappers'

import CommentDisplay from '@/app/lib/components/display/base/comment'

const TextTypeAnalyses = ({ analyses }) => {
  return analyses.map((analysis, i) => {
    const { id, name, results = [] } = analysis
    
    return (
      <>
        <Header name={name} mb={2} />
        <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2}>
        { results.map((r, i) => {
          const { id, value, eventId, specimenSequenceId, specimenSpecieName } =  r
          const label = <>{[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}{'\u00A0'}:</>

          return (
            <Row label={label} key={id}>
              <CommentDisplay w={'full'} flex={2} minRows={1} value={value} />
            </Row>
          )}) 
        }
      </VStack>
      </>
    )})
}

export default TextTypeAnalyses
