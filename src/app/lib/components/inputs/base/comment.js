import { Textarea } from '@chakra-ui/react'

const CommentInput = ({ value, ...rest }) => {
  return (<Textarea autoresize={'autoresize'} rows={1} value={value ?? ''} {...rest} />)
} 

export default CommentInput