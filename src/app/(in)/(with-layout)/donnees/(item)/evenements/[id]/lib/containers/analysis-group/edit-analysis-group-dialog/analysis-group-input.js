import { useCallback } from 'react'

import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from '../wrappers'

import CommentInput from '@/app/lib/components/inputs/base/comment'
import NumberInput from '@/app/lib/components/inputs/base/number'

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

const ValueTypeAnalysisInput = ({ value, onChange }) => {
  const { name, results = [] } = value
  return (
    <Row label={`${name}\u00A0:`}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
        { results.map((r, i) => {
          const { id: resultId, value, unit } =  r
          return (
            <NumberInput value={value} key={resultId} suffix={unit} onChange={(value) => onChange(resultId, value)} />
          )
        })}
      </HStack>
    </Row>
  )
}

const ValueTypeAnalysesInput = ({ value, onChange }) => {
  return (
    <VStack flex={1} alignItems={'stretch'} w={'full'} mb={4}>
      {value.map((analysis, i) => {
        const { id } = analysis
        return (
          <>
            { i === 0 &&<ValueTypeAnalysisHeader analysis={analysis} /> }
            <ValueTypeAnalysisInput value={analysis} onChange={onChange}/>
          </>
        )
      }) }  
    </VStack>
  )
}

const TextTypeAnalysesInput = ({ value, onChange }) => {
  return value.map((analysis, i) => {
    const { id, name, results = [] } = analysis

    return (
      <>
        <Header name={name} mb={2} />
        <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2}>
        { results.map((r, i) => {
          const { id: resultId, value, eventId, specimenSequenceId, specimenSpecieName } =  r
          const label = <>{[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}{'\u00A0'}:</>

          return (
            <Row label={label} key={id}>
              <CommentInput w={'full'} flex={2} minRows={2} value={value} onChange={(value) => onChange(resultId, value)} />
            </Row>
          )}) 
        }
      </VStack>
      </>
    )})
}

const AnalysisGroupInput = ({ value = [], onChange }) => {
  const handleChange = useCallback((resultId, newValue) => {
    // console.debug('AnalysisGroupInput - handleChange', resultId, newValue)

    const newAnalyses = value.map(analysis => {
      const newResults = analysis.results.map(r => {
        if (r.id === resultId) {
          return { ...r, value: newValue }
        }
        return r
      })
      return { ...analysis, results: newResults }
    })

    onChange(newAnalyses)
  }, [value, onChange])

  const valueTypeAnalyses = value.filter(an => an.resultTypeId !== 3)
  const textTypeAnalyses = value.filter(an => an.resultTypeId === 3)

  return (
    <Flex direction={'column'} w={'full'} gap={4} justifyContent={'flex-start'}>
      <ValueTypeAnalysesInput value={valueTypeAnalyses} onChange={handleChange} />  
      <TextTypeAnalysesInput value={textTypeAnalyses} onChange={handleChange} />
    </Flex>
  )
}

export default AnalysisGroupInput