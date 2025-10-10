import { Textarea } from '@chakra-ui/react'

const CommentInput = ({ value, ...rest }) => {
  return (<Textarea autoresize={'autoresize'} rows={3} value={value ?? ''} {...rest} />)
} 

export default CommentInput