import { Input, InputGroup } from '@chakra-ui/react'

const TextDisplay = ({ value, prefix, suffix, flex = 1, ...rest }) => {
  return (
    <InputGroup
      flex={flex}
      startElement={prefix}
      endElement={suffix}
    >
      <Input size={['lg', null, 'md']} value={value ?? ''} readOnly {...rest} />
    </InputGroup>
  )
}

export default TextDisplay