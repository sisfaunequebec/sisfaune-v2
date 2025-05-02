import { Box, Flex, Container, VStack, AbsoluteCenter, IconButton, Text, HStack, Separator, Fieldset, Input } from '@chakra-ui/react'
import { RxPencil1, RxPlus, RxTrash } from 'react-icons/rx'

import {
  AccordionItem,
  AccordionRoot
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../components/accordion-parts'

import TextField from '../components/text-field'
import CommentField from '../components/comment-field'

import DateField from '../components/date-field'

import AgeSelect from '../components/age-select'
import SexSelect from '../components/sex-select'
import EtatDecouverteSelect from '../components/etat-decouverte-select'
import CauseMortSelect from '../components/cause-mort-select'

import MeasureField from '../components/measure-field'

import SelectFieldAdvanced from '../../../../../../../lib/components/select-field-advanced'
import getPreservationMethods from '../actions/get-preservation-methods'

import MeasuresSection from './measures-section'

const MethodePreservationSelect = ({ label, value, isEditing }) => {
  return (
    <SelectFieldAdvanced isEditing label={label} value={value} valueLabelKey='name' getter={() => getPreservationMethods(value)} />
  )
}

const SpecimenForm = ({ specimen, isEditing, onToggleEditing }) => {
  console.debug(specimen)
  const {
    id,
    specimenNumber,
    terrainIdentificationNumber,
    silabIdentificationNumber,
    cqsasNumber,
    sefaqNumber,
    huntingPermitNumber,
    identificationMarks,

    discoveryStateId,
    deathCauseId,

    preservationMethodId,
    notes,
    keywords,

    ageId,
    sexId,

    discoveryState,
    deathCause,
    specie,
    age,
    sex,
    preservationMethod,

    measures
  } = specimen

  const { name: specieName, binome, group } = specie

  return (
    <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>

      <Fieldset.Legend>Identification du spécimen</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <TextField label={'Numéro d\'identification sur le terrain\u00A0:'} value={terrainIdentificationNumber} isEditing={isEditing} />
        <TextField label={'Numéro de spécimen SILAB\u00A0:'} value={silabIdentificationNumber} isEditing={isEditing} />
        <TextField label={'Numéro de spécimen CQSAS\u00A0:'} value={cqsasNumber} isEditing={isEditing} />
        <TextField label={'Numéro d\'enregistement SEFAQ\u00A0:'} value={sefaqNumber} isEditing={isEditing} />
        <TextField label={'Numéro de permis de chasse\u00A0:'} value={huntingPermitNumber} isEditing={isEditing} />
        <CommentField label={'Marques d\'identification\u00A0:'} value={identificationMarks} isEditing={isEditing} />
        <EtatDecouverteSelect label={'État lors de la découverte\u00A0:'} value={discoveryState} isEditing={isEditing} />
        <CauseMortSelect label={'Cause de la mort\u00A0:'} value={deathCause} isEditing={isEditing} />
      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Mesures</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <AgeSelect label={'Âge\u00A0:'} value={age} group={group} isEditing={isEditing} />
        <SexSelect label={'Sexe\u00A0:'} value={sex} isEditing={isEditing} />

        <MeasuresSection measures={measures} />

        {/* <MeasureField label={'Circonférence du cou\u00A0:'} value={null} isEditing={true} />
        <TextField label={'Circonférence du thorax\u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Hauteur au garrot\u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Longueur totale (MB)\u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Longueur totale (MQ) \u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Longueur totale (MV)\u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Mesure de la patte arrière\u00A0:'} value={null} isEditing={isEditing} />
        <TextField label={'Poids\u00A0:'} value={null} isEditing={isEditing} /> */}
      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Autres informations</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <MethodePreservationSelect label={'Méthode de conservation\u00A0:'} value={preservationMethod} isEditing={isEditing} />
        <CommentField label={'Remarques\u00A0:'} value={notes} isEditing={isEditing} />
        <CommentField label={'Mots-clés\u00A0:'} value={keywords} isEditing={isEditing} />
      </Fieldset.Content>

      <Separator />

    </Fieldset.Root>
  )
}

const SpecimenInformationSection = ({ specimen, onToggleEditing, onDelete }) => {
  // console.debug(specimen)
  const { id, specimenNumber, specie } = specimen
  const { name: specieName, binome } = specie
  return (
    <AccordionItem key={id} value={id}>
      <Box position='relative'>
        <AbsoluteCenter as={HStack} axis='vertical' insetEnd={5}>
          { onToggleEditing && <IconButton colorPalette='green' variant='subtle' rounded='full' size={['xs']}><RxPencil1 /></IconButton> }
          { onDelete && <IconButton colorPalette='red' variant='surface' rounded='full' size={['xs']} onClick={onDelete}><RxTrash /></IconButton> }
        </AbsoluteCenter>
        <Trigger label={`${specimenNumber} - ${specieName} (${binome})`} />
      </Box>
      <Content>
        <SpecimenForm specimen={specimen} />
      </Content>
    </AccordionItem>
  )
}

export default SpecimenInformationSection
