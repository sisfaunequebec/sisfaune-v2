import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import { Tooltip } from '@/app/lib/components/ui/tooltip'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { numericFormatter } from 'react-number-format'

import { Trigger, Content } from '../../components/accordion-parts'

// import EditSpecimenButton from './edit-specimen-button'
import DeleteAnalysisButton from '../../components/delete-analysis-button'

import Fields from '@/app/lib/components/display/fields'

import SelectDisplay from '@/app/lib/components/display/base/select'
import NumberDisplay from '@/app/lib/components/display/base/number'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

// import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'

// const MeasuresDisplay = ({ value = [] }) => {
//   return (
//     <VStack spacing={1} flex={1} >
//     { value.map(measure => {
//       const { id, value, type, unit } = measure
//       const { name: measureName, toto: descriptionText } = type 
//       const { name: unitName } = unit
//       return (
//         <ChakraField.Root key={id} justifyContent={'stretch'}>
//           <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
//           <Tooltip content={descriptionText} disabled={!descriptionText}>
//             <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} textDecoration={descriptionText && 'underline'} cursor={descriptionText && 'help'} lineHeight={'shorter'}>
//               {measureName} :
//             </ChakraField.Label>
//           </Tooltip>
//           <Flex flex={2} w={'full'} direction={'column'}>
//             <Flex flex={1} bg={'gray.100'} borderRadius={'md'} px={3} py={3} lineHeight={'1.1rem'}>
//               { !!value ? [numericFormatter(value, { decimalSeparator:',' }), unitName].join(' ') : '\u00A0' }
//             </Flex>
//           </Flex>
//           </Flex>
//         </ChakraField.Root>
//       )
//     })}
//     </VStack>
//   )
// }

// const schema = [
//   { 
//     title: 'Identification du spécimen',
//     fields: [
//       { label: 'Numéro d\'identification sur le terrain\u00A0:', name: 'terrainIdentificationNumber' },
//       { label: 'Numéro de spécimen SILAB\u00A0:', name: 'silabIdentificationNumber' },
//       { label: 'Numéro de spécimen CQSAS\u00A0:', name: 'cqsasNumber' },
//       { label: 'Numéro d\'enregistement SEFAQ\u00A0:', name: 'sefaqNumber' },
//       { label: 'Numéro de permis de chasse\u00A0:', name: 'huntingPermitNumber' },
//       { label: 'Marques d\'identification\u00A0:', name: 'identificationMarks', component: CommentDisplay },
//       { label: 'État lors de la découverte\u00A0:', name: 'discoveryState', component: SelectDisplay },
//       { label: 'Cause de la mort\u00A0:', name: 'deathCause', component: SelectDisplay }
//     ]
//   },
//   { 
//     title: 'Détails sur l\'euthanasie',
//     visible: (data) => { const { deathCause } = data; const { id: deathCauseId } = deathCause; return [1, 101, 102].includes(deathCauseId) },
//     fields: [
//       { label: 'Organisme reponsable\u00A0:', name: 'euthanasiaOrganisation', component: SelectDisplay },
//       { label: 'Date d\'euthanasie\u00A0:', name: 'euthanizedAt', component: DateDisplay },
//       { label: 'Méthode utilisée\u00A0:', name: 'euthanasiaMethod', component: SelectDisplay },
//       { label: 'Quantité d\'immobilisant utilisée\u00A0:', name: 'productAmount', component: NumberDisplay, props: { precision: 2 } , visible: (data) => { const { euthanasiaMethod } = data; const euthanasiaMethodId = euthanasiaMethod?.id;  return (euthanasiaMethodId === 1) } },
//       { label: 'Numéro de bouteille\u00A0:', name: 'bottleNumber', visible: (data) => { const { euthanasiaMethod } = data; const euthanasiaMethodId = euthanasiaMethod?.id; return (euthanasiaMethodId === 1) } }
//     ]
//   },
//   { 
//     title: 'Mesures',
//     fields: [
//       { label: 'Âge\u00A0:', name: 'age', component: SelectDisplay },
//       { label: 'Sexe\u00A0:', name: 'sex', component: SelectDisplay },
//       { label: null, name: 'measures', component: MeasuresDisplay }
//     ]
//   },
//   { 
//     title: 'Autres informations',
//     fields: [
//       { label: 'Méthode de conservation\u00A0:', name: 'preservationMethod', component: SelectDisplay },
//       { label: 'Remarques\u00A0:', name: 'notes', component: CommentDisplay },
//       { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentDisplay }
//     ]
//   }
// ]

const AnalysisSection = ({ analysis, canEdit = false }) => {
  const { id: analysisId, name } = analysis

  return (
    <AccordionItem key={analysisId} value={analysisId}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={999} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2} gap={0.5}>
          { canEdit && <DeleteAnalysisButton analysis={analysis} /> }
          {/* { canEdit && <EditSpecimenButton specimen={specimen} /> } */}
        </AbsoluteCenter>
        <Trigger label={`${name}`} h={'46px'} />
      </Box>
      <Content id={`#analysis_id_${analysisId}`}>
        <Analysis data={analysis} />
        {/* <Fields schema={schema} data={analysis} /> */}
      </Content>
    </AccordionItem>
  )
}

const Header = ({ analyses }) => {
  const firstAnalysis = analyses[0] || {}
  const { results = [] } = firstAnalysis

  return (
    <ChakraField.Root justifyContent={'stretch'}>
      <Flex direction={'row'} alignItems={'center'}w={'full'} fontWeight={'medium'}>
       <ChakraField.Label fontWeight={'medium'} fontSize={['md', null, 'sm']} color={'gray.600'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
          Spécimen(s){'\u00A0'}:
        </ChakraField.Label>
        <HStack w={'full'} flex={2} >
          { results.map(r => {
            const { eventId, specimenSequenceId } = r
            return (
              <Flex flex={1} borderRadius={'md'} px={3} py={3} lineHeight={'1.1rem'}>
                {`${eventId}.${specimenSequenceId}`}
              </Flex>
            )
          }) }
        </HStack>
      </Flex>
    </ChakraField.Root>
  )
}

const Analysis = ({ data }) => {
  console.debug('Analysis', data)
  const { analyses = [] } = data
  
  return (
    <VStack flex={1} alignItems={'stretch'} w={'full'}>
      <Header analyses={analyses} />
      <>
        { analyses.map(a => {
          // console.debug(a)
          const { name, results = [] } = a
          return (
            <ChakraField.Root justifyContent={'stretch'}>
              <Flex direction={'row'} w={'full'} alignItems={'center'}>
                <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={0} lineHeight={'shorter'}>
                  {name}{'\u00A0'}:
                </ChakraField.Label>
                <HStack w={'full'} flex={2} gap={2}>
                  { results.map(r => {
                    const { value } =  r
                    return (
                      <Flex flex={1} bg={'gray.100'} borderRadius={'md'} px={3} py={3} lineHeight={'1.1rem'}>
                        { value || '\u00A0' }
                      </Flex>
                    )
                  }) }
                </HStack>
              </Flex>
            </ChakraField.Root>
          )})
        }
      </>
    </VStack>
  )

  // // const firstResult = results[0]
  // const { results = [] } = data
  // // const firstResult = results[0]
  // // const specimens = firstResult.map()
  // return (
  //   <VStack>
  //     { results.map(r => {
  //         return JSON.stringify(r)
  //       })
  //     }
  //   </VStack>
  // )
}

// const AnalysisInformationSection = ({ analysis, onToggleEditing, onDelete }) => {
//   // console.debug(specimen)
//   const { id, specimenNumber, specie } = specimen
//   const { name: specieName, binome } = specie
//   return (
//     <AccordionItem key={id} value={id}>
//       <Box position='relative'>
//         <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
//           { onToggleEditing && <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton> }
//           { onDelete && <IconButton colorPalette='red' variant='subtle' rounded='full' size={['xs']} onClick={onDelete}><RxTrash /></IconButton> }
//         </AbsoluteCenter>
//         <Trigger label={`${specimenNumber} - ${specieName} (${binome})`} />
//       </Box>
//       <Content>
//         <SpecimenForm specimen={specimen} />
//       </Content>
//     </AccordionItem>
//   )
// }

export default AnalysisSection
