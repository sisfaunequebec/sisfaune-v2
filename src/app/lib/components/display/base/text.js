import { Input, InputGroup } from '@chakra-ui/react'

const TextDisplay = ({ value, prefix, suffix, ...rest }) => {
  return (
    <InputGroup
      flex={1}
      startElement={prefix}
      endElement={suffix}
    >
      <Input size={['lg', null, 'md']} value={value ?? ''} readOnly {...rest} />
    </InputGroup>
  )
}

export default TextDisplay