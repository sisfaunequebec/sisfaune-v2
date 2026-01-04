import { useCallback } from 'react'

import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'

import { Header, Row } from '../wrappers'

import CommentInput from '@/app/lib/components/inputs/base/comment'
import NumberInput from '@/app/lib/components/inputs/base/number'
import SelectInput from '@/app/lib/components/inputs/base/select'

const ValueTypeAnalysisHeader = ({ analysis }) => {
  const { results = [] } = analysis

  return (
    <Header name={'\u00A0'}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'flex-between'} alignItems={'flex-start'}>
        { results.map((r, i) => {
          const { id, eventId, specimenSequenceId, specimenSpecieName } = r
          return (
            <Flex flex={1} px={3} ps={1} py={3} lineHeight={'1.1rem'} key={id} color={'gray.600'} >
              {[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}         
            </Flex>
          )
        }) }
      </HStack>
    </Header>
  )
}

const CodeTypeInput = ({ value, codes, onChange, contentRef }) => {
  // console.debug('CodeTypeInput', { value, codes, onChange })
  return (
    <SelectInput value={{ value, label: value }} items={codes.map(c => ({ value: c.code, label: c.description }))} onChange={(selected) => onChange(selected ? selected.value : null)} contentRef={contentRef} clearable={false} />
  )
}

const ValueTypeInput = ({ value, onChange, precision }) => {
  return (
    <NumberInput value={value} precision={precision} onChange={onChange} />
  )
}

const ValueOrCodeTypeAnalysisInput = ({ value, onChange, contentRef }) => {
  const { name, unit, precision, resultTypeId, codeValues, results = [] } = value
  const unitLabel  = unit ? ` (${unit})` : ''
  const label = [name, unitLabel].join('')
  return (
    <Row label={`${label}\u00A0:`}>
      <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
        { results.map((r, i) => {
          const { id, value } =  r

          if (resultTypeId === 1) {
            return (
              <ValueTypeInput key={id} value={value} precision={precision} onChange={(value) => onChange(id, value)} />
            )
          } else if (resultTypeId === 2) {
            return (
              <CodeTypeInput key={id} value={value} codes={codeValues} onChange={(value) => onChange(id, value)} contentRef={contentRef} />
            )
          }
        })}
      </HStack>
    </Row>
  )
}

const ValueTypeAnalysesInput = ({ value, onChange, contentRef }) => {
  return (
    <VStack flex={1} alignItems={'stretch'} w={'full'} mb={4}>
      {value.map((analysis, i) => {
        const { id } = analysis
        return (
          <>
            { i === 0 &&<ValueTypeAnalysisHeader analysis={analysis} /> }
            <ValueOrCodeTypeAnalysisInput value={analysis} onChange={onChange} key={id} contentRef={contentRef} />
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
      <Box key={i}>
        <Header name={name} mb={2} />
        <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2}>
        { results.map((r, i) => {
          const { id, value, eventId, specimenSequenceId, specimenSpecieName } =  r
          const label = <>{[eventId, specimenSequenceId].join('.')}<br/>{specimenSpecieName}{'\u00A0'}:</>

          return (
            <Row label={label} key={id}>
              <CommentInput w={'full'} flex={2} minRows={2} value={value} onChange={(value) => onChange(id, value)} />
            </Row>
          )}) 
        }
      </VStack>
      </Box>
    )})
}

const AnalysisGroupInput = ({ value = [], onChange, contentRef }) => {
  console.debug('AnalysisGroupInput', { contentRef })
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
      <ValueTypeAnalysesInput value={valueTypeAnalyses} onChange={handleChange} contentRef={contentRef} />  
      <TextTypeAnalysesInput value={textTypeAnalyses} onChange={handleChange} contentRef={contentRef} />
    </Flex>
  )
}

export default AnalysisGroupInput