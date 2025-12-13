import { HStack, VStack } from '@chakra-ui/react'

import TextInput from './base/text'
import { useCallback } from 'react'

const AddressInput = ({ value, onChange, size }) => {
  // console.debug('AddressInput', value)
  const { firstName, lastName, streetNumber, street, apt, postalCode, localityId, telephone, email } =  value || {}

  const handleChange = useCallback((name, v) => {
    const newValue = {
      ...value,
      [name]: v
    }
    onChange(newValue)
  }, [onChange, value])

  return (
    <VStack flex={1} alignItems={'stretch'}>
      <HStack flex={1}>
        <TextInput size={size} placeholder={'Prénom'} value={firstName} onChange={v => handleChange('firstName', v)} />
        <TextInput size={size} placeholder={'Nom'} value={lastName} onChange={v => handleChange('lastName', v)}/>
      </HStack>
      <HStack flex={1}>
        <TextInput size={size} placeholder={'No civique'} flex={1} value={streetNumber} onChange={v => handleChange('streetNumber', v)} />
        <TextInput size={size} placeholder={'Rue / route'} flex={3} value={street} onChange={v => handleChange('street', v)} />
        <TextInput size={size} placeholder={'App'} flex={1} value={apt} onChange={v => handleChange('apt', v)} />
      </HStack>
      <TextInput size={size} placeholder={'Municipalité'} flex={1} value={localityId} onChange={v => handleChange('localityId', v)} />
      <TextInput size={size} placeholder={'Code postal'} flex={1} value={postalCode} onChange={v => handleChange('postalCode', v)} />
      <TextInput size={size} placeholder={'Téléphone'} flex={1} value={telephone} onChange={v => handleChange('telephone', v)} />
      <TextInput size={size} placeholder={'Courriel'} flex={1} value={email} onChange={v => handleChange('email', v)} />
    </VStack>
  )
}

export default AddressInput
