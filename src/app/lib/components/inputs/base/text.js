import { useCallback, useState, useEffect } from 'react'

import { Input, IconButton } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'

import { RxCross2 } from 'react-icons/rx'

const TextInput = ({ value, onChange, clearable = false, decoration, ...rest }) => {
  const handleChange = useCallback(e => {
    const { target } = e
    const { value } = target
    onChange(value ? value : undefined)
  }, [onChange])

  const handleClearValue = useCallback(() => {
    onChange(null)
  }, [onChange])

  const showClearButton = clearable && !!value

  return (
    <InputGroup
      flex={1}
      startElement={decoration}
      endElement={showClearButton && <IconButton variant='ghost' size='xs' rounded='full' me={-1} onClick={handleClearValue}><RxCross2 /></IconButton>}
    >
      <Input flex={1} value={value ?? ''} onChange={handleChange} {...rest} />
    </InputGroup>
  )
}

export default TextInput
