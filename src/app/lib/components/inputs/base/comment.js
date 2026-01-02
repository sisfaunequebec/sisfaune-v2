import { useCallback } from 'react'

import { Textarea } from '@chakra-ui/react'

const CommentInput = ({ value, minRows = 1, onChange, ...rest }) => {
  const handleChange = useCallback((e) => {
    const { target } = e
    const { value } = target
    onChange(value?.trim()?.length ? value : null)
  }, [onChange])

  return (<Textarea autoresize={'autoresize'} rows={minRows} value={value ?? ''} onChange={handleChange} {...rest} />)
} 

export default CommentInput