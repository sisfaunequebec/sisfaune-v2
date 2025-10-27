import CommentInput from '../../inputs/base/comment'

const CommentDisplay = ({ ...rest }) => {
  return (<CommentInput readOnly {...rest} />)
} 

export default CommentDisplay