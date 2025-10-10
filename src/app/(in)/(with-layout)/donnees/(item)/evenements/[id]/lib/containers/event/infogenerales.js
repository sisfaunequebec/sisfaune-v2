import { useCallback } from 'react'
import { useToggle } from '@uidotdev/usehooks'

import { Box, AbsoluteCenter, IconButton, HStack, Separator, Fieldset, Button } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

// import ResponsiveButton from '@/app/lib/components/responsive-button'

import TextField from '../../components/text-field'
import DateField from '../../components/date-field'
import CommentField from '../../components/comment-field'

import TypeEvenementSelect from '../../components/type-evenement-select'
import StatutSelect from '../../components/statut-select'
import ProgrammeSelect from '../../components/programme-select'
import ProvenanceSelect from '../../components/provenance-select'
import HabitatSelect from '../../components/habitat-select'
import MethodeExpeditionSelect from '../../components/methode-expedition-select'
import LaboratoireSelect from '../../components/laboratoire-select'
import AffectedSpeciesField from '../../components/affected-species-field'

import EditGeneralInfosButton from './edit-general-infos-button'

// import MeasureField from '../components/measure-field'

const InfosGeneralesForm = ({ event, isEditing, onToggleEditing }) => {
  // console.debug(event)
  const {
    id, typeId, silabId, cqsasIncidentNumber, pathologyNumber, reportedAt, mapaqId, programId, reportOriginId, statusId,
    labShippingDate, labShippingTrackingNumber, labShippingMethodId, labId,
    discoveredAt, collectedAt, temperature, habitatTypeId,
    observations, commentaires, keywords,

    type,
    program,
    reportOrigin,
    status,
    habitatType,
    labShippingMethod,
    lab
  } = event

  return (
    <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>

      <Fieldset.Legend>Identification</Fieldset.Legend>
      <Fieldset.Content gap={1} mt={2}>
        <TextField label={'Numéro d\'événement\u00A0:'} value={id} isEditing={isEditing} />
        <TypeEvenementSelect label={'Type d\'événement\u00A0:'} value={type} isEditing={isEditing} />
        <TextField label={'Numéro d\'identification SILAB\u00A0:'} value={silabId} isEditing={isEditing} />
        <TextField label={'Numéro d\'incident CQSAS\u00A0:'} value={cqsasIncidentNumber} isEditing={isEditing} />
        <TextField label={'Numéro de pathologie\u00A0:'} value={pathologyNumber} isEditing={isEditing} />
        <DateField label={'Date du signalement\u00A0:'} value={reportedAt} isEditing={isEditing} />
        <TextField label={'Numéro centrale MAPAQ\u00A0:'} value={mapaqId} isEditing={isEditing} />
        <ProgrammeSelect label={'Programme\u00A0:'} value={program} isEditing={isEditing} />
        <ProvenanceSelect label={'Provenance du signalement\u00A0:'} value={reportOrigin} isEditing={isEditing} />
        <StatutSelect label={'Statut\u00A0:'} value={status} isEditing={isEditing} />
      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Personnes impliquées</Fieldset.Legend>
      <Fieldset.Content gap={1} mt={2} />

      <Separator />

      <Fieldset.Legend>Description de l&apos;événement</Fieldset.Legend>
      <Fieldset.Content gap={1} mt={2}>
        <DateField label={'Date de la découverte\u00A0:'} value={discoveredAt} isEditing={isEditing} />
        <DateField label={'Date de la récolte\u00A0:'} value={collectedAt} isEditing={isEditing} />
        <TextField label={'Contacts possibles\u00A0:'} value={null} isEditing={isEditing} />
        <HabitatSelect label={'Type d\'habitat\u00A0:'} value={habitatType} isEditing={isEditing} />
        <TextField label={'Température\u00A0:'} value={temperature} isEditing={isEditing} />
        <AffectedSpeciesField label={'Individus affectés, par espèce\u00A0:'} value={temperature} isEditing={isEditing} />
        <CommentField label={'Observations sur le terrain\u00A0:'} value={observations} isEditing={isEditing} />
        <CommentField label={'Commentaires généraux\u00A0:'} value={commentaires} isEditing={isEditing} />
        <CommentField label={'Mots-clés\u00A0:'} value={keywords} isEditing={isEditing} />
      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Expédition des spécimens</Fieldset.Legend>
      <Fieldset.Content gap={1} mt={2}>
        <DateField label={'Spécimen(s) expédié(s) le\u00A0:'} value={labShippingDate} isEditing={isEditing} />
        <MethodeExpeditionSelect label={'Méthode d\'expédition\u00A0:'} value={labShippingMethod} isEditing={isEditing} />
        <TextField label={'Numéro de connaissement\u00A0:'} value={labShippingTrackingNumber} isEditing={isEditing} />
        <LaboratoireSelect label={'Laboratoire de destination\u00A0:'} value={lab} isEditing={isEditing} />
      </Fieldset.Content>

    </Fieldset.Root>
  )
}

const InfosGeneralesSection = ({ event, canEdit = false }) => {
  const isEditing = false

  return (
    <AccordionItem value='general' position={isEditing ? 'sticky' : 'static'} zIndex={isEditing && 1000} disabled={isEditing} >
      <Box position={isEditing ? 'sticky' : 'relative'} top={isEditing && [135, null, 130]} zIndex={isEditing && 1000} minH={'48px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditGeneralInfosButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label='Informations générales' />
      </Box>
      <Content>
        <InfosGeneralesForm event={event} isEditing={isEditing}  />
      </Content>
    </AccordionItem>
  )
}

export default InfosGeneralesSection
