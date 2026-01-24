import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from '../../../../../../../../../lib/components/dialogs/wrappers'

import NumberDisplay from '@/app/lib/components/display/base/number'
import TextDisplay from '@/app/lib/components/display/base/text'

const ValueTypeAnalysisHeader = ({ analysis }) => {
  const { results = [] } = analysis

  return (
    <Header name={'\u00A0'}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'flex-between'} alignItems={'flex-start'}>
        { results.map((r, i) => {
          const { eventId, specimenSequenceId, specimenSpecieName } = r
          return (
            <Flex flex={1} borderRadius={'md'} px={3} ps={1} py={3} lineHeight={'1.1rem'} key={i} color={'gray.600'}> 
              {[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}      
            </Flex>
          )
        }) }
      </HStack>
    </Header>
  )
}

const ValueTypeDisplay = ({ value, precision }) => {
  return (
    <NumberDisplay value={value} precision={precision} />
  )
}

const CodeTypeDisplay = ({ value, codes }) => {
  // console.log('CodeTypeDisplay', { value, codes })
  const label = codes?.find(c => c.code === value)?.description
  return (
    <TextDisplay value={label} />
  )
}

const ValueOrCodeTypeAnalysis = ({ analysis }) => {
  // console.debug('ValueOrCodeTypeAnalysis', { analysis })
  const { name, unit, precision, results = [], resultTypeId, codeValues } = analysis
  const unitLabel  = unit ? ` (${unit})` : ''
  const label = [name, unitLabel].join('')
  return (
    <Row label={`${label}\u00A0:`}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
        { results.map((r, i) => {
          const { id, value } =  r

          if (resultTypeId === 1) {
            return (
              <ValueTypeDisplay key={id} value={value} precision={precision} />
            )
          } else if (resultTypeId === 2) {
            return (
              <CodeTypeDisplay key={id} value={value} codes={codeValues} />
            )
          }
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
          <Box key={i}>
            { i === 0 && <ValueTypeAnalysisHeader analysis={analysis} /> }
            <ValueOrCodeTypeAnalysis analysis={analysis} key={id}/>
          </Box>
        )
      }) }
    </VStack>
  )
}

export default ValueTypeAnalyses