import { Textarea } from '@chakra-ui/react'

const CommentInput = ({ value, minRows = 1, ...rest }) => {
  return (<Textarea autoresize={'autoresize'} rows={minRows} value={value ?? ''} {...rest} />)
} 

export default CommentInput