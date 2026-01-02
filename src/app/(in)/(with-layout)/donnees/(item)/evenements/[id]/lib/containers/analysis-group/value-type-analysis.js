import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from './wrappers'

import NumberDisplay from '@/app/lib/components/display/base/comment'

const ValueTypeAnalysisHeader = ({ analysis }) => {
  const { results = [] } = analysis

  return (
    <Header name={'\u00A0'}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'flex-between'}>
        { results.map((r, i) => {
          const { eventId, specimenSequenceId, specimenSpecieName } = r
          return (
            <Flex flex={1} borderRadius={'md'} px={3} ps={1} py={3} lineHeight={'1.1rem'} key={i} color={'gray.600'} >
              {[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}         
            </Flex>
          )
        }) }
      </HStack>
    </Header>
  )
}

const ValueTypeAnalysis = ({ analysis }) => {
  const { name, results = [] } = analysis
  return (
    <Row label={`${name}\u00A0:`}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
        { results.map((r, i) => {
          const { id, value, unit } =  r
          return (
            <NumberDisplay value={value} key={id} suffix={unit} />
          )
        })}
      </HStack>
    </Row>
  )
}

const ValueTypeAnalyses = ({ analyses }) => {
  return (
    <VStack flex={1} alignItems={'stretch'} w={'full'} mb={4}>
      {analyses.map((analysis, i) => {
        const { id } = analysis
        return (
          <>
            { i === 0 &&<ValueTypeAnalysisHeader analysis={analysis} /> }
            <ValueTypeAnalysis analysis={analysis} key={id}/>
          </>
        )
      }) }
    </VStack>
  )
}

export default ValueTypeAnalyses