'use client'
import { useCallback } from 'react'

import { useQueryState } from 'nuqs'

import { Input, IconButton } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'

import { RxMagnifyingGlass, RxCross2 } from 'react-icons/rx'

const FullText = ({ onChange = () => null }) => {
  const [internalValue, setInternalValue] = useQueryState('t', {
    defaultValue: ''
  })
  // const [internalValue, setInternalValue] = useState('')

  const handleChangeValue = useCallback(e => {
    const { target } = e
    const { value: rawValue } = target
    // const value = rawValue?.trim()
    setInternalValue(rawValue)
    onChange(rawValue)
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
      endElement={showClearButton && <IconButton variant='ghost' size='xs' rounded='full' me={-1} onClick={handleClearValue}><RxCross2 /></IconButton>}
    >
      <Input variant='surface' onChange={handleChangeValue} value={internalValue} />
    </InputGroup>
  )
}

export default FullText
