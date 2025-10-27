import { Input, InputGroup } from '@chakra-ui/react'
import { NumericFormat } from 'react-number-format'

const NumberDisplay = ({ value, prefix, suffix, precision = 0, ...rest }) => {
  return (
    <InputGroup
      flex={1}
      startElement={prefix}
      endElement={suffix}
    >
      <NumericFormat value={value ?? ''} customInput={Input} readOnly decimalScale={precision} decimalSeparator={','} {...rest} />
    </InputGroup>
  )
} 

export default NumberDisplay