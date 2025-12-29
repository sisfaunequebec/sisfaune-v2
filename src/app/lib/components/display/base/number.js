import { Input, InputGroup } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'

const NumberDisplay = ({ value, prefix, suffix, precision, ...rest }) => {
  const showSuffix = suffix && value
  return (
    <InputGroup
      flex={1}
      startElement={prefix}
      endElement={showSuffix && suffix}
    >
      <NumericFormat value={value ?? ''} customInput={Input} readOnly decimalScale={precision} decimalSeparator={','} {...rest} />
    </InputGroup>
  )
} 

export default NumberDisplay