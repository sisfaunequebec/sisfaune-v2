import { Box, AbsoluteCenter, VStack, HStack, Separator, Fieldset } from '@chakra-ui/react'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Field } from '@/app/lib/components/ui/field'

import { Trigger, Content } from '../../components/accordion-parts'

import Fields from '@/app/lib/components/display/fields'

// import TextDisplay from '@/app/lib/components/display/base/text'
import SelectDisplay from '@/app/lib/components/display/base/select'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

// import TextField from '../../components/text-field'
// import DateField from '../../components/date-field'
// import CommentField from '../../components/comment-field'

// import TypeEvenementSelect from '../../components/type-evenement-select'
// import StatutSelect from '../../components/statut-select'
// import ProgrammeSelect from '../../components/programme-select'
// import ProvenanceSelect from '../../components/provenance-select'
// import HabitatSelect from '../../components/habitat-select'
// import MethodeExpeditionSelect from '../../components/methode-expedition-select'
// import LaboratoireSelect from '../../components/laboratoire-select'
// import AffectedSpeciesField from '../../components/affected-species-field'

import EditGeneralInfosButton from './edit-general-infos-button'

// import MeasureField from '../components/measure-field'

const schema = [
  { 
    title: 'Identification',
    fields: [
      { label: 'Numéro d\'événement\u00A0:', name: 'id' },
      { label: 'Type d\'événement\u00A0:', name: 'type', component: SelectDisplay },
      { label: 'Numéro d\'identification SILAB\u00A0:', name: 'silabId' },
      { label: 'Numéro d\'incident CQSAS\u00A0:', name: 'cqsasIncidentNumber' },
      { label: 'Numéro de pathologie\u00A0:', name: 'pathologyNumber' },
      { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateDisplay },
      { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      { label: 'Programme\u00A0:', name: 'program', component: SelectDisplay  },
      { label: 'Provenance du signalement\u00A0:', name: 'reportOrigin', component: SelectDisplay  },
      { label: 'Statut\u00A0:', name: 'status', component: SelectDisplay  },
      { label: 'Date de fermeture du dossier\u00A0:', component: DateDisplay, name: 'closedAt', visible: (data) => { const { statusId, closedAt } = data; return (statusId === 3 && closedAt) } },
    ]
  },
  { 
    title: 'Personnes impliquées',
    fields: [
    ]
  },
  { 
    title: 'Description de l\'événement',
    fields: [
      { label: 'Date de la découverte\u00A0:', name: 'discoveredAt', component: DateDisplay },
      { label: 'Date de la récolte\u00A0:', name: 'collectedAt', component: DateDisplay },
      // { label: 'Contacts possibles\u00A0:', name: 'toto'  },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatType', component: SelectDisplay },
      { label: 'Température (en celsius)\u00A0:', name: 'temperature' },
      // { label: 'Individus affectés, par espèce\u00A0:', name: 'titi' },
      { label: 'Observations sur le terrain\u00A0:', name: 'observations', component: CommentDisplay },
      { label: 'Commentaires généraux\u00A0:', name: 'comments', component: CommentDisplay },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentDisplay },
    ]
  },
  { 
    title: 'Expédition des spécimens',
    fields: [
      { label: 'Spécimen(s) expédié(s) le\u00A0:', name: 'labShippedAt', component: DateDisplay},
      { label: 'Méthode d\'expédition\u00A0:', name: 'labShippingMethod', component: SelectDisplay },
      { label: 'Numéro de connaissement\u00A0:', name: 'labShippingTrackingNumber'  },
      { label: 'Laboratoire de destination\u00A0:', name: 'lab', component: SelectDisplay }
    ]
  },
]

const GeneralInfos = ({ event }) => {
  return (
    <Fields schema={schema} data={event} />
  )

  // return (
  //   <VStack gap={2} flex={1}>
  //     {formSchema.map(section => {
  //       const { title, fields } = section
  //       return (
  //         <Fieldset.Root key={title} gap={2} mt={4} _first={{ mt: 0 }}>
  //           <Fieldset.Legend>{title}</Fieldset.Legend>
  //           <Fieldset.Content gap={2}>
  //             {fields.map(f => {
  //               const { label, name, visible = true, component, props = {} } = f
  //               const isVisible = (typeof visible === 'function') ? visible(data) : visible
  //               const Component = component || TextDisplay
  //               const value = event[name] 
  //               // console.debug(name, Component.displayName)
  //               if (!isVisible) { return null }
  //               return (
  //                 <Field key={name} label={label} name={name} variant={'horizontal'}>
  //                   <Component value={value} {...props} />
  //                 </Field>
  //               )
  //             })}
  //           </Fieldset.Content>
  //           <Separator />
  //         </Fieldset.Root>
  //       )
  //     })}
  //   </VStack>
  // )

  // return (
  //   <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>

  //     <Fieldset.Legend>Identification</Fieldset.Legend>
  //     <Fieldset.Content gap={1} mt={2}>
  //       <TextField label={'Numéro d\'événement\u00A0:'} value={id} isEditing={isEditing} />
  //       <TypeEvenementSelect label={'Type d\'événement\u00A0:'} value={type} isEditing={isEditing} />
  //       <TextField label={'Numéro d\'identification SILAB\u00A0:'} value={silabId} isEditing={isEditing} />
  //       <TextField label={'Numéro d\'incident CQSAS\u00A0:'} value={cqsasIncidentNumber} isEditing={isEditing} />
  //       <TextField label={'Numéro de pathologie\u00A0:'} value={pathologyNumber} isEditing={isEditing} />
  //       <DateField label={'Date du signalement\u00A0:'} value={reportedAt} isEditing={isEditing} />
  //       <TextField label={'Numéro centrale MAPAQ\u00A0:'} value={mapaqId} isEditing={isEditing} />
  //       <ProgrammeSelect label={'Programme\u00A0:'} value={program} isEditing={isEditing} />
  //       <ProvenanceSelect label={'Provenance du signalement\u00A0:'} value={reportOrigin} isEditing={isEditing} />
  //       <StatutSelect label={'Statut\u00A0:'} value={status} isEditing={isEditing} />
  //       { closedAt && <DateField label={'Date de fermeture du dossier\u00A0:'} value={closedAt} isEditing={isEditing} />}
  //     </Fieldset.Content>

  //     <Separator />

  //     <Fieldset.Legend>Personnes impliquées</Fieldset.Legend>
  //     <Fieldset.Content gap={1} mt={2} />

  //     <Separator />

  //     <Fieldset.Legend>Description de l&apos;événement</Fieldset.Legend>
  //     <Fieldset.Content gap={1} mt={2}>
  //       <DateField label={'Date de la découverte\u00A0:'} value={discoveredAt} isEditing={isEditing} />
  //       <DateField label={'Date de la récolte\u00A0:'} value={collectedAt} isEditing={isEditing} />
  //       <TextField label={'Contacts possibles\u00A0:'} value={null} isEditing={isEditing} />
  //       <HabitatSelect label={'Type d\'habitat\u00A0:'} value={habitatType} isEditing={isEditing} />
  //       <TextField label={'Température (en celsius)\u00A0:'} value={temperature} isEditing={isEditing} />
  //       <AffectedSpeciesField label={'Individus affectés, par espèce\u00A0:'} value={temperature} isEditing={isEditing} />
  //       <CommentField label={'Observations sur le terrain\u00A0:'} value={observations} isEditing={isEditing} />
  //       <CommentField label={'Commentaires généraux\u00A0:'} value={commentaires} isEditing={isEditing} />
  //       <CommentField label={'Mots-clés\u00A0:'} value={keywords} isEditing={isEditing} />
  //     </Fieldset.Content>

  //     <Separator />

  //     <Fieldset.Legend>Expédition des spécimens</Fieldset.Legend>
  //     <Fieldset.Content gap={1} mt={2}>
  //       <DateField label={'Spécimen(s) expédié(s) le\u00A0:'} value={labShippedAt} isEditing={isEditing} />
  //       <MethodeExpeditionSelect label={'Méthode d\'expédition\u00A0:'} value={labShippingMethod} isEditing={isEditing} />
  //       <TextField label={'Numéro de connaissement\u00A0:'} value={labShippingTrackingNumber} isEditing={isEditing} />
  //       <LaboratoireSelect label={'Laboratoire de destination\u00A0:'} value={lab} isEditing={isEditing} />
  //     </Fieldset.Content>

  //   </Fieldset.Root>
  // )
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
        <GeneralInfos event={event} isEditing={isEditing}  />
      </Content>
    </AccordionItem>
  )
}

export default InfosGeneralesSection
