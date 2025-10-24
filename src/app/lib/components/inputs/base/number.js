import { useCallback } from 'react'

import { NumericFormat } from 'react-number-format';
import { Input } from '@chakra-ui/react'

const NumberInput = ({ value, onChange, precision = 0, ...rest }) => {
  const handleValueChange = useCallback(e => {
    const { floatValue } = e
    console.debug(e)
    onChange(floatValue ?? null)
  }, [onChange])

  return (
    <NumericFormat value={value} customInput={Input} decimalScale={precision} decimalSeparator={','} onValueChange={handleValueChange} {...rest} />
  )
} 

export default NumberInput