import { Input, IconButton } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'

const TextDisplay = ({ value, ...rest }) => {
  return (
    // <InputGroup
    //   flex={1}
    //   startElement={decoration}
    //   endElement={showClearButton && <IconButton variant='ghost' size='xs' rounded='full' me={-1} onClick={handleClearValue}><RxCross2 /></IconButton>}
    // >
      <Input size={['lg', null, 'md']} value={value ?? ''} readOnly {...rest} />
    // </InputGroup>
  )
}

export default TextDisplay