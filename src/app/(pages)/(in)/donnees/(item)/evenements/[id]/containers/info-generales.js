import { useToggle } from '@uidotdev/usehooks'

import { Box, AbsoluteCenter, IconButton, HStack, Separator, Fieldset, Button } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem,
} from '@/components/ui/accordion'

import { Trigger, Content } from '../components/accordion-parts'

import TextField from '../components/text-field'
import DateField from '../components/date-field'

import TypeEvenementSelect from '../components/type-evenement-select'
import StatutSelect from '../components/statut-select'
import ProgrammeSelect from '../components/programme-select'
import ProvenanceSelect from '../components/provenance-select'
import HabitatSelect from '../components/habitat-select'
import MethodeExpeditionSelect from '../components/methode-expedition-select'

const InfosGeneralesForm = ({ event, isEditing, onToggleEditing }) => {
  const {
    id, typeId, silabId, cqsasIncidentNumber, pathologyNumber, reportedAt, mapaqId, programId, reportOriginId, statusId,
    labShippingDate, labShippingTrackingNumber, labShippingMethodId, labId,
    discoveredAt, collectedAt, temperature, habitatTypeId
   } = event
  
  return (
    <Fieldset.Root as={'VStack'} alignItems={'stretch'} size={['lg', null, 'md']}>

      <Fieldset.Legend>Identification</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <TextField label={'Numéro d\'événement\u00A0:'} value={id} isEditing={isEditing} />
        <TypeEvenementSelect label={'Type d\'événement\u00A0:'} value={typeId} isEditing={isEditing}  />
        <TextField label={'Numéro d\'identification SILAB\u00A0:'} value={silabId} isEditing={isEditing} />
        <TextField label={'Numéro d\'incident CQSAS\u00A0:'} value={cqsasIncidentNumber} isEditing={isEditing} />
        <TextField label={'Numéro de pathologie\u00A0:'} value={pathologyNumber} isEditing={isEditing} />
        <DateField label={'Date du signalement\u00A0:'} value={reportedAt} isEditing={isEditing} />
        <TextField label={'Numéro centrale MAPAQ\u00A0:'} value={mapaqId} isEditing={isEditing} />
        <ProgrammeSelect label={'Programme\u00A0:'} value={programId} isEditing={isEditing}  />
        <ProvenanceSelect label={'Provenance du signalement\u00A0:'} value={reportOriginId} isEditing={isEditing}  />
        <StatutSelect label={'Statut\u00A0:'} value={statusId} isEditing={isEditing}  />
      </Fieldset.Content>
      
      <Separator />

      <Fieldset.Legend>Personnes impliquées</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>

      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Description</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <DateField label={'Date de la découverte\u00A0:'} value={discoveredAt} isEditing={isEditing} />
        <DateField label={'Date de la récolte\u00A0:'} value={collectedAt} isEditing={isEditing} />
        <TextField label={'Contacts possibles\u00A0:'} value={null} isEditing={isEditing} />
        <HabitatSelect label={'Type d\'habitat\u00A0:'} value={habitatTypeId} isEditing={isEditing} />
        <TextField label={'Température\u00A0:'} value={temperature} isEditing={isEditing} />
      </Fieldset.Content>

      <Separator />

      <Fieldset.Legend>Expédition des spécimens</Fieldset.Legend>
      <Fieldset.Content gap={0.5} mt={2}>
        <DateField label={'Spécimen(s) expédié(s) le\u00A0:'} value={labShippingDate} isEditing={isEditing} />
        <MethodeExpeditionSelect label={'Méthode d\'expédition\u00A0:'} value={labShippingMethodId} isEditing={isEditing} />
        <TextField label={'Numéro de connaissement\u00A0:'} value={labShippingTrackingNumber} isEditing={isEditing} />
        <TextField label={'Laboratoire de destination\u00A0:'} value={labId} isEditing={isEditing} />
      </Fieldset.Content>

      { isEditing &&
        <HStack flex={1} justifyContent={'flex-end'}>
          <Button variant={'subtle'} colorPalette={'blue'} size={'sm'} onClick={onToggleEditing} borderRadius={'full'}>Annuler</Button>
          <Button variant={'solid'} colorPalette={'blue'} size={'sm'} onClick={onToggleEditing} borderRadius={'full'}>Sauvegarder les modification</Button>
        </HStack>
      }

    </Fieldset.Root>
  )
}

const InfosGeneralesSection = ({ event, onToggleEditing }) => {
  const [isEditing, toggleEditing] = useToggle(false)

  return (
    <AccordionItem value={'general'}>
      <Box position={'relative'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5}>
          { !isEditing && <IconButton colorPalette={'green'} variant={'subtle'} rounded={'full'} size={['xs']} onClick={toggleEditing}><RxPencil1 /></IconButton> }
        </AbsoluteCenter>
        <Trigger label={'Informations générales'} disabled={isEditing} />
      </Box>
      <Content>
        <InfosGeneralesForm event={event} isEditing={isEditing} onToggleEditing={toggleEditing} />
      </Content>
    </AccordionItem>
  )
  
}

export default InfosGeneralesSection
