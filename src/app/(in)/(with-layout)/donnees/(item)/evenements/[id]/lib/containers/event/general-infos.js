import { Box, AbsoluteCenter, VStack, HStack, Separator, Fieldset } from '@chakra-ui/react'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import Fields from '@/app/lib/components/display/fields'

import SelectDisplay from '@/app/lib/components/display/base/select'
import NumberDisplay from '@/app/lib/components/display/base/number'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'

import EditGeneralInfosButton from './edit-general-infos-button'

const CollaboratorDisplay = ({ value }) => {
  let text = null
  
  if (value) {
    const {
      firstName, lastName,
      title,
      organisation,
      division,
      service,
      streetNumber, street,
      localityName, province,
      postalCode,
      telephone, extension,
      email: emailRaw
    } = value

    const fullName = [firstName, lastName].join(' ')
    const address = (streetNumber || localityName) ? ['\u00A0', [streetNumber, street].filter(Boolean).join(', ')].join('\r') : null
    const city =  [localityName, province].filter(Boolean).join(', ')
    const phone = telephone ? `Téléphone : ${[telephone, extension].filter(Boolean).join(' #')}` : null
    const email = emailRaw ? `Courriel : ${[emailRaw].join(' ')}` : null

    text = [fullName, title, organisation, division, service, address, city, postalCode, '\u00A0', phone, email].filter(Boolean).join('\r')
  }

  return (
    <CommentDisplay value={text} />
  )
}

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
      { label: 'Soumis par\u00A0:', name: 'submitter', component: CollaboratorDisplay },
      { label: 'Découvert par\u00A0:', name: 'discoveredBy', component: UnimplementedDisplay },
      { label: 'Récolté par (contractuel)\u00A0:', name: 'collaborator' , component: SelectDisplay }
    ]
  },
  { 
    title: 'Description de l\'événement',
    fields: [
      { label: 'Date de la découverte\u00A0:', name: 'discoveredAt', component: DateDisplay },
      { label: 'Date de la récolte\u00A0:', name: 'collectedAt', component: DateDisplay },
      { label: 'Contacts possibles\u00A0:', name: 'toto' , component: UnimplementedDisplay },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatType', component: SelectDisplay },
      { label: 'Température\u00A0:', name: 'temperature', component: NumberDisplay, props: { precision: 1, suffix: '(en celsius)' } },
      { label: 'Individus affectés, par espèce\u00A0:', name: 'titi', component: UnimplementedDisplay },
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

const GeneralInfosSection = ({ event, canEdit = false }) => {
  return (
    <AccordionItem value={'general'} position={'sticky'} zIndex={1000}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={1000} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditGeneralInfosButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label='Informations générales' h={'46px'} />
      </Box>
      <Content>
        <Fields schema={schema} data={event} />
      </Content>
    </AccordionItem>
  )
}

export default GeneralInfosSection
