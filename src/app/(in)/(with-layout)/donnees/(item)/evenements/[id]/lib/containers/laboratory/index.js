import { Box, AbsoluteCenter, HStack, Fieldset } from '@chakra-ui/react'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import EditLaboratoryButton from './edit-laboratory-button'
import LaboratoryFormContent from './laboratory-form-content'

const LaboratoireSectionForm = ({ data }) => {
  return (
    <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>
      <LaboratoryFormContent data={data} />
    </Fieldset.Root>
  )
}

const LaboratoireSection = ({ event, canEdit }) => {
  const isEditing = false

  return (
    <AccordionItem value='laboratory' position={isEditing ? 'sticky' : 'static'} zIndex={isEditing && 1000} disabled={isEditing}>
      <Box position={isEditing ? 'sticky' : 'relative'} top={isEditing && [135, null, 130]} zIndex={isEditing && 1000} minH={'48px'}>
          <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
            { canEdit && <EditLaboratoryButton event={event} /> }
          </AbsoluteCenter>
        <Trigger label={'Laboratoire'} />
      </Box>
      <Content>
        <LaboratoireSectionForm data={event} />
      </Content>
    </AccordionItem>
  )
}

export default LaboratoireSection
