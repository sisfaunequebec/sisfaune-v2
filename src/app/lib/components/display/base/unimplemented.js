// import { Textarea } from '@chakra-ui/react'
import TextDisplay from './text'

const UnimplementedDisplay = ({ value, ...rest }) => {
  return (<TextDisplay value={'À développer'} readOnly color={'red'} {...rest} />)
} 

export default UnimplementedDisplay