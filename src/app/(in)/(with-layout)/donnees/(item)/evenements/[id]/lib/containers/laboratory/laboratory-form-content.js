import { Box, AbsoluteCenter, IconButton, HStack, Separator, Fieldset, Button } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import TextField from '../../components/text-field'
import DateField from '../../components/date-field'

const ResponsableCombo = () => {
  return (
    <TextField label={'Responsable du dossier\u00A0:'} value='TODO' isEditing={false} />
  )
}

const RecuParCombo = () => {
  return (
    <TextField label={'Reçu(s) par\u00A0:'} value='TODO' isEditing={false} />
  )
}

const LaboratoryFormContent = ({ data = {}, isEditing = false }) => {
  const { labReceivedAt } =  data
  return (
    <Fieldset.Content gap={0.5} mt={2}>
      <ResponsableCombo isEditing={isEditing} />
      <DateField label={'Spécimen(s) reçu(s) le\u00A0:'} value={labReceivedAt} isEditing={isEditing} />
      <RecuParCombo isEditing={isEditing} />
    </Fieldset.Content>
  )
}

export default LaboratoryFormContent