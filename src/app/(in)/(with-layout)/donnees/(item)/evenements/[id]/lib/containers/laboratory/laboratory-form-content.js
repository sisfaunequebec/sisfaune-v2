import { useCallback } from 'react'

import isFunction from 'lodash.isfunction'

import { Fieldset } from '@chakra-ui/react'

import TextField from '../../components/text-field'
import DateField from '../../components/date-field'

const DisplayField = ({ label, value, valueDisplayKey, isEditing }) => {
  const textValue = value ? (valueDisplayKey ? (isFunction(valueDisplayKey) ? valueDisplayKey(value) : value[valueDisplayKey]) : value) : ''
  return (
    <TextField label={label} value={textValue} isEditing={isEditing}  />
  )
}

const Responsible = ({ value, isEditing }) => {
  const valueDisplayKey = useCallback(value => {
    const fullName = [value?.firstName, value?.lastName].join(' ')
    return [fullName, value?.organisation].join(', ')
  }, [])

  return (
    <DisplayField label={'Responsable du dossier\u00A0:'} value={value} valueDisplayKey={valueDisplayKey} isEditing={isEditing} />
  )
}

const ReceivedAt = ({ value, isEditing }) => {
  return (
    <DateField label={'Spécimen(s) reçu(s) le\u00A0:'} value={value} isEditing={isEditing} />
  )
}


const ReceivedBy = ({ value, isEditing }) => {
  return (
    <TextField label={'Spécimen(s) reçu(s) par\u00A0:'} value={value} isEditing={isEditing} />
  )
}

const LaboratoryFormContent = ({ data = {}, isEditing = false }) => {
  const { labResponsible, labReceivedAt, labReceivedBy } =  data
  // console.debug(labReceivedBy)
  return (
    <Fieldset.Content gap={1}>
      <Responsible value={labResponsible} isEditing={isEditing} />
      <ReceivedAt value={labReceivedAt} isEditing={isEditing} />
      <ReceivedBy value={labReceivedBy} isEditing={isEditing} />
    </Fieldset.Content>
  )
}

export default LaboratoryFormContent