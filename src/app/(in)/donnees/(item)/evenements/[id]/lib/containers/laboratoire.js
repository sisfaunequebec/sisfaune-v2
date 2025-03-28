import { useCallback } from 'react'

import { useToggle } from '@uidotdev/usehooks'

import { Box, AbsoluteCenter, IconButton, HStack, Separator, Fieldset, Button } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem,
} from '@/components/ui/accordion'

import { Trigger, Content } from '../components/accordion-parts'

import TextField from '../components/text-field'
import DateField from '../components/date-field'

const ResponsableCombo = () => {
  return (
    <TextField label={'Responsable du dossier\u00A0:'} value={'TODO'} isEditing={false} />
  )
}

const RecuParCombo = () => {
  return (
    <TextField label={'Reçu(s) par\u00A0:'} value={'TODO'} isEditing={false} />
  )
}

// import TypeEvenementSelect from '../components/type-evenement-select'
// import StatutSelect from '../components/statut-select'
// import ProgrammeSelect from '../components/programme-select'
// import ProvenanceSelect from '../components/provenance-select'
// import HabitatSelect from '../components/habitat-select'
// import MethodeExpeditionSelect from '../components/methode-expedition-select'

const LaboratoireSectionForm = ({ event, isEditing, onToggleEditing }) => {
return (
    <Fieldset.Root as={'VStack'} alignItems={'stretch'} size={['lg', null, 'md']}>

      <Fieldset.Content gap={0.5} mt={2}>
        <ResponsableCombo isEditing={isEditing} />
        <DateField label={'Spécimen(s) reçu(s) le\u00A0:'} value={null} isEditing={isEditing} />
        <RecuParCombo isEditing={isEditing} />
      </Fieldset.Content>

    </Fieldset.Root>
  )
}

const LaboratoireSection = ({ event, editingSection, onToggleEditing }) => {
  // const [isEditing, toggleEditing] = useToggle(false)
  const isEditing = editingSection === 'laboratoire'

  const handleToggleEditing = useCallback(() => {
    onToggleEditing('laboratoire')
  }, [onToggleEditing])

  return (
    <AccordionItem value={'laboratoire'} position={isEditing ? 'sticky' : 'static'} zIndex={isEditing && 1000} disabled={isEditing}>
      <Box position={isEditing ? 'sticky' : 'relative'} top={isEditing && [135, null, 130]} zIndex={isEditing && 1000}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={5} zIndex={1000}>
            <HStack flex={1} justifyContent={'flex-end'}>
            { isEditing ?
              <>
                <Button variant={'solid'} colorPalette={'blue'} size={'xs'} onClick={handleToggleEditing} borderRadius={'full'}>Sauvegarder les modifications</Button>
                <Button variant={'surface'} colorPalette={'blue'} size={'xs'} onClick={handleToggleEditing} borderRadius={'full'}>Annuler</Button>
              </>
              : 
              <IconButton colorPalette={'green'} variant={'surface'} rounded={'full'} size={['xs']} onClick={handleToggleEditing}><RxPencil1 /></IconButton>
            }
            </HStack>
        </AbsoluteCenter>
        <Trigger label={'Laboratoire'}  />
      </Box>
      <Content>
        <LaboratoireSectionForm event={event} isEditing={isEditing} onToggleEditing={handleToggleEditing} />
      </Content>
    </AccordionItem>
  )
  
}

export default LaboratoireSection
