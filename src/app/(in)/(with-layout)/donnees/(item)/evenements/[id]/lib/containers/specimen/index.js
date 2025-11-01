import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text, HStack, Separator, Fieldset, Input } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import DeleteSpecimenButton from '../../components/delete-specimen-button'

import Fields from '@/app/lib/components/display/fields'

import SelectDisplay from '@/app/lib/components/display/base/select'
import NumberDisplay from '@/app/lib/components/display/base/number'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'


// import TextField from '../../components/text-field'
// import CommentField from '../../components/comment-field'

// import DateField from '../../components/date-field'

// import AgeSelect from '../../components/age-select'
// import SexSelect from '../../components/sex-select'
// import EtatDecouverteSelect from '../../components/etat-decouverte-select'
// import CauseMortSelect from '../../components/cause-mort-select'

// import MeasureField from '../components/measure-field'

// import SelectFieldAdvanced
// import SelectFieldAdvanced from '@/app/lib/components/select-field-advanced'
// import getPreservationMethods from '../../actions/get-preservation-methods'

// import MeasuresSection from '../measures-section'

// const MethodePreservationSelect = ({ label, value, isEditing }) => {
//   return (
//     <SelectFieldAdvanced isEditing label={label} value={value} valueLabelKey='name' getter={() => getPreservationMethods(value)} />
//   )
// }

// const SpecimenForm = ({ specimen, isEditing, onToggleEditing }) => {
//   // console.debug(specimen)
//   const {
//     id,
//     specimenNumber,
//     terrainIdentificationNumber,
//     silabIdentificationNumber,
//     cqsasNumber,
//     sefaqNumber,
//     huntingPermitNumber,
//     identificationMarks,

//     discoveryStateId,
//     deathCauseId,

//     preservationMethodId,
//     notes,
//     keywords,

//     ageId,
//     sexId,

//     discoveryState,
//     deathCause,
//     specie,
//     age,
//     sex,
//     preservationMethod,

//     measures
//   } = specimen

//   const { name: specieName, binome, group } = specie

//   return (
//     <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>

//       <Fieldset.Legend>Identification du spécimen</Fieldset.Legend>
//       <Fieldset.Content gap={0.5} mt={2}>
//         <TextField label={'Numéro d\'identification sur le terrain\u00A0:'} value={terrainIdentificationNumber} isEditing={isEditing} />
//         <TextField label={'Numéro de spécimen SILAB\u00A0:'} value={silabIdentificationNumber} isEditing={isEditing} />
//         <TextField label={'Numéro de spécimen CQSAS\u00A0:'} value={cqsasNumber} isEditing={isEditing} />
//         <TextField label={'Numéro d\'enregistement SEFAQ\u00A0:'} value={sefaqNumber} isEditing={isEditing} />
//         <TextField label={'Numéro de permis de chasse\u00A0:'} value={huntingPermitNumber} isEditing={isEditing} />
//         <CommentField label={'Marques d\'identification\u00A0:'} value={identificationMarks} isEditing={isEditing} />
//         <EtatDecouverteSelect label={'État lors de la découverte\u00A0:'} value={discoveryState} isEditing={isEditing} />
//         <CauseMortSelect label={'Cause de la mort\u00A0:'} value={deathCause} isEditing={isEditing} />
//       </Fieldset.Content>

//       <Separator />

//       <Fieldset.Legend>Mesures</Fieldset.Legend>
//       <Fieldset.Content gap={0.5} mt={2}>
//         <AgeSelect label={'Âge\u00A0:'} value={age} group={group} isEditing={isEditing} />
//         <SexSelect label={'Sexe\u00A0:'} value={sex} isEditing={isEditing} />

//         <MeasuresSection measures={measures} />

//         {/* <MeasureField label={'Circonférence du cou\u00A0:'} value={null} isEditing={true} />
//         <TextField label={'Circonférence du thorax\u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Hauteur au garrot\u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Longueur totale (MB)\u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Longueur totale (MQ) \u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Longueur totale (MV)\u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Mesure de la patte arrière\u00A0:'} value={null} isEditing={isEditing} />
//         <TextField label={'Poids\u00A0:'} value={null} isEditing={isEditing} /> */}
//       </Fieldset.Content>

//       <Separator />

//       <Fieldset.Legend>Autres informations</Fieldset.Legend>
//       <Fieldset.Content gap={0.5} mt={2}>
//         <MethodePreservationSelect label={'Méthode de conservation\u00A0:'} value={preservationMethod} isEditing={isEditing} />
//         <CommentField label={'Remarques\u00A0:'} value={notes} isEditing={isEditing} />
//         <CommentField label={'Mots-clés\u00A0:'} value={keywords} isEditing={isEditing} />
//       </Fieldset.Content>

//       <Separator />

//     </Fieldset.Root>
//   )
// }

const schema = [
  { 
    title: 'Identification du spécimen',
    fields: [
      { label: 'Numéro d\'identification sur le terrain\u00A0:', name: 'terrainIdentificationNumber' },
      { label: 'Numéro de spécimen SILAB\u00A0:', name: 'silabIdentificationNumber' },
      { label: 'Numéro de spécimen CQSAS\u00A0:', name: 'cqsasNumber' },
      { label: 'Numéro d\'enregistement SEFAQ\u00A0:', name: 'sefaqNumber' },
      { label: 'Numéro de permis de chasse\u00A0:', name: 'huntingPermitNumber' },
      { label: 'Marques d\'identification\u00A0:', name: 'identificationMarks', component: CommentDisplay },
      { label: 'État lors de la découverte\u00A0:', name: 'discoveryState', component: SelectDisplay },
      { label: 'Cause de la mort\u00A0:', name: 'deathCause', component: SelectDisplay },
      // { label: 'Provenance du signalement\u00A0:', name: 'reportOrigin', component: SelectDisplay  },
      // { label: 'Statut\u00A0:', name: 'status', component: SelectDisplay  },
      // { label: 'Date de fermeture du dossier\u00A0:', component: DateDisplay, name: 'closedAt', visible: (data) => { const { statusId, closedAt } = data; return (statusId === 3 && closedAt) } },
    ]
  },
  { 
    title: 'Mesures',
    fields: [
      { label: 'Âge\u00A0:', name: 'sex', component: SelectDisplay },
      { label: 'Sexe\u00A0:', name: 'age', component: SelectDisplay }
    ]
  },
  { 
    title: 'Autres informations',
    fields: [
      { label: 'Méthode de conservation\u00A0:', name: 'preservationMethod', component: SelectDisplay },
      { label: 'Remarques\u00A0:', name: 'notes', component: CommentDisplay },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentDisplay }
    ]
  }
]

const SpecimenSection = ({ specimen, canEdit = false }) => {
  const { id: specimenId, eventId, sequenceId, specie } = specimen
  const { name: specieName } = specie

  console.debug(specimen)

  return (
      <AccordionItem key={specimenId} value={specimenId} >
        <Box position={'relative'} /*top={[135, null, 130]} zIndex={1000}*/ minH={'48px'}>
          <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2} gap={0.5}>
            { canEdit && <DeleteSpecimenButton specimen={specimen}/> }
            { canEdit && <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} /> }
          </AbsoluteCenter>
          <Trigger label={`${eventId}.${sequenceId} - ${specieName}`} />
        </Box>
        <Content id={`#specimen_id_${specimenId}`}>
          <Fields schema={schema} data={specimen} />
        </Content>
      </AccordionItem>
  )
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

export default SpecimenSection
