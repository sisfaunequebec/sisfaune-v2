import { Box, AbsoluteCenter, HStack, Textarea } from '@chakra-ui/react'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import Fields from '@/app/lib/components/display/fields'

import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

import EditLaboratoryButton from './edit-laboratory-button'

const LabResponsibleDisplay = ({ value }) => {
  let text = ''
  if (value) {
    const { firstName, lastName, organisation } = value
    text = `${[firstName, lastName].join(' ')}\r${organisation}`
  }
  return (
    <CommentDisplay value={text} whiteSpace={'pre'} />
  )
}

const schema = [
  { 
    title: null,
    fields: [
      { label: 'Responsable du dossier\u00A0:', name: 'labResponsible', component: LabResponsibleDisplay },
      { label: 'Spécimen(s) reçu(s) le\u00A0:', name: 'labReceivedAt', component: DateDisplay },
      { label: 'Spécimen(s) reçu(s) par\u00A0:', name: 'labReceivedBy' }
    ]
  }
]

const LaboratoireSection = ({ event, canEdit }) => {
  return (
    <AccordionItem value={'laboratory'} position={'sticky'} zIndex={1000}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={1000} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditLaboratoryButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label={'Laboratoire'} h={'46px'} />
      </Box>
      <Content>
        <Fields schema={schema} data={event} />
      </Content>
    </AccordionItem>
  )
}

export default LaboratoireSection
