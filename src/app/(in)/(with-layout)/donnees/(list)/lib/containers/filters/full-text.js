'use client'
import { useCallback, useState, useEffect } from 'react'

import { useQueryState } from 'nuqs'
import { useDebounce } from '@uidotdev/usehooks'

import TextInput from '@/app/lib/components/inputs/base/text'

const FullText = () => {
  const [internalValue, setInternalValue] = useQueryState('t', {
    defaultValue: ''
  })

  const [value, setValue] = useState(internalValue)

  const debouncedValue = useDebounce(value, 700)

  useEffect(() => {
    setInternalValue(debouncedValue)
  }, [debouncedValue])

  const handleChangeValue = useCallback(value => {
    setValue(value)
  }, [setValue])

  return (
    <TextInput onChange={handleChangeValue} value={value} clearable={true} variant={'surface'} />
  )
}

export default FullText
