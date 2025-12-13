import { useCallback, useState, useEffect } from 'react'

import { Input, InputGroup, IconButton } from '@chakra-ui/react'

import { RxCross2 } from 'react-icons/rx'

const TextInput = ({ value, onChange, clearable = false, prefix, suffix, flex, ...rest }) => {
  const handleChange = useCallback(e => {
    const { target } = e
    const { value } = target
    onChange(value ? value : null)
  }, [onChange])

  const handleClearValue = useCallback(() => {
    onChange(null)
  }, [onChange])

  const showClearButton = clearable && !!value

  return (
    <InputGroup
      flex={flex}
      startElement={prefix}
      endElement={showClearButton ? <IconButton variant='ghost' size='xs' rounded='full' me={-1} onClick={handleClearValue}><RxCross2 /></IconButton> : suffix}
    >
      <Input flex={1} value={value ?? ''} onChange={handleChange} {...rest} />
    </InputGroup>
  )
}

export default TextInput
