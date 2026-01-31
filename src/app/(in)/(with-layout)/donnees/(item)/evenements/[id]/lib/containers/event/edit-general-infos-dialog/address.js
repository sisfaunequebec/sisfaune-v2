import { useCallback } from 'react'

import { HStack, VStack } from '@chakra-ui/react'

import TextInput from '@/app/lib/components/inputs/base/text'
import Autocomplete from '@/app/lib/components/inputs/autocomplete'

const LocalityCombo = ({ value, onChange, contentRef, ...rest }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/localities?t=${inputValue}`)
    const data = await response.json()
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [[item?.name].join(' '), [item?.regionName].join(' ')]
  }, [])

  const labelKey = useCallback(item => [item?.name].join(' '), [])

  return (
    <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} placeholder={'Taper pour rechercher une municipalité...'} />
  )
}

const DiscovererAddressInput = ({ value, onChange, contentRef, size }) => {
  const { firstName, lastName, streetNumber, street, apt, postalCode, locality, telephone, email } =  value || {}

  const handleChange = useCallback((name, v) => {
    const newValue = {
      ...value,
      [name]: v
    }
    onChange(newValue)
  }, [onChange, value])

  const handleComboChange = useCallback(v => {
    const newValue = {
      ...value,
      locality: v
    }
    onChange(newValue)
  }, [onChange, value])

  return (
    <VStack flex={1} alignItems={'stretch'}>
      <HStack flex={1}>
        <TextInput key={'firstName'} id={'firstName'} size={size} placeholder={'Prénom'} value={firstName} onChange={v => handleChange('firstName', v)} />
        <TextInput key={'lastName'} id={'lastName'} size={size} placeholder={'Nom'} value={lastName} onChange={v => handleChange('lastName', v)}/>
      </HStack>
      <HStack flex={1}>
        <TextInput key={'streetNumber'} id={'streetNumber'} size={size} placeholder={'No civique'} flex={1} value={streetNumber} onChange={v => handleChange('streetNumber', v)} />
        <TextInput key={'street'} id={'street'} size={size} placeholder={'Rue / route'} flex={3} value={street} onChange={v => handleChange('street', v)} />
        <TextInput key={'apt'} id={'apt'} size={size} placeholder={'App'} flex={1} value={apt} onChange={v => handleChange('apt', v)} />
      </HStack>
      <LocalityCombo key={'locality'} id={'locality'} flex={1} value={locality} contentRef={contentRef} onChange={handleComboChange} />
      <TextInput key={'postalCode'} id={'postalCode'} size={size} placeholder={'Code postal'} flex={1} value={postalCode} onChange={v => handleChange('postalCode', v)} />
      <TextInput key={'telephone'} id={'telephone'} size={size} placeholder={'Téléphone'} flex={1} value={telephone} onChange={v => handleChange('telephone', v)} />
      <TextInput key={'email'} id={'email'} size={size} placeholder={'Courriel'} flex={1} value={email} onChange={v => handleChange('email', v)} />
    </VStack>
  )
}

export default DiscovererAddressInput
