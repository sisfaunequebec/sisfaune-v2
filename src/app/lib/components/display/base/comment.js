import { Textarea } from '@chakra-ui/react'

const CommentDisplay = ({ value, ...rest }) => {
  return (<Textarea autoresize={'autoresize'} rows={3} value={value ?? ''} readOnly {...rest} />)
} 

export default CommentDisplay