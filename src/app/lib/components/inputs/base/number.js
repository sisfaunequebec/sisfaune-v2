import { useCallback } from 'react'

import isNil from 'lodash.isnil'

import { NumericFormat } from 'react-number-format'
import { Input, InputGroup } from '@chakra-ui/react'

const NumberInput = ({ value, onChange, prefix, suffix, precision = 0, flex = 1, ...rest }) => {
  const handleValueChange = useCallback(e => {
    const { floatValue } = e
    
    const valueToReturn = isNil(floatValue) ? null : floatValue
    // console.debug('Value changed', valueToReturn, typeof  valueToReturn)
    onChange(valueToReturn)
  }, [onChange])

  return (
    <InputGroup
      flex={flex}
      startElement={prefix}
      endAddon={suffix}
    >
      <NumericFormat value={value} customInput={Input} decimalScale={precision} decimalSeparator={','} onValueChange={handleValueChange} {...rest} />
    </InputGroup>
  )
} 

export default NumberInput