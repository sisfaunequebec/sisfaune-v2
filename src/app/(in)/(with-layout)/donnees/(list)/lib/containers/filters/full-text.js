'use client'
import { useCallback, useState, useEffect } from 'react'

import { useQueryState } from 'nuqs'
import { useDebounce } from '@uidotdev/usehooks'

// import { useThrottle } from '@uidotdev/usehooks'

import { Input, IconButton } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'

import { RxMagnifyingGlass, RxCross2 } from 'react-icons/rx'

import TextField from '../../../../(item)/evenements/[id]/lib/components/text-field'

const FullText = ({ onChange = () => null }) => {
  const [internalValue, setInternalValue] = useQueryState('t', {
    defaultValue: ''
  })

  const [value, setValue] = useState(internalValue)

  const debouncedValue = useDebounce(value, 700)

  useEffect(() => {
    setInternalValue(debouncedValue)
  }, [debouncedValue])

  const handleChangeValue = useCallback(e => {
    const { target } = e
    const { value: rawValue } = target
    setValue(rawValue)
  }, [setValue])

  const handleClearValue = useCallback(() => {
    setValue('')
    setInternalValue('')
  }, [setInternalValue, onChange])

  const showClearButton = !!internalValue

  return (
    <InputGroup
      flex={1}
      startElement={<RxMagnifyingGlass />}
      endElement={showClearButton && <IconButton variant='ghost' size='xs' rounded='full' me={-1} onClick={handleClearValue}><RxCross2 /></IconButton>}
    >
      <TextField variant={'surface'} onChange={handleChangeValue} value={value} />
    </InputGroup>
  )
}

export default FullText
