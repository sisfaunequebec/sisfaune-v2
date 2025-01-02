'use client'
import { useState, useCallback } from 'react'

import { Input, IconButton } from '@chakra-ui/react'
import { InputGroup } from "@/components/ui/input-group"

import { RxMagnifyingGlass, RxCross2 } from 'react-icons/rx'

const Texte = ({ onChange = () => null }) => {

  const [internalValue, setInternalValue] = useState('')

  const handleChangeValue = useCallback(e => {
    const { target } = e
    const { value } = target
    setInternalValue(value)
    onChange(value)
  }, [setInternalValue, onChange])

  const handleClearValue = useCallback(() => {
    setInternalValue('')
    onChange(null)
  }, [setInternalValue, onChange])

  const showClearButton = !!internalValue

  return (
    <InputGroup
      flex={1}
      startElement={<RxMagnifyingGlass />}
      endElement={showClearButton && <IconButton variant={'ghost'} size={'xs'} rounded={'full'} me={-2} onClick={handleClearValue}><RxCross2 /></IconButton>}
    >
      <Input variant={'surface'} onChange={handleChangeValue} value={internalValue} />
    </InputGroup>
  )
}

export default Texte