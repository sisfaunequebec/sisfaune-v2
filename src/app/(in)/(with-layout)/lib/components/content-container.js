import { Flex } from '@chakra-ui/react'

const ContentContainer = ({ children, direction = 'row' }) => {
  const justifyContent = direction === 'row' ? 'center' : 'stretch'
  return (
  <Flex flex={5} ps={[0, null, 2]} justifyContent={justifyContent} alignItems={'stretch'} direction={direction}>
    { children }
  </Flex>
  )
}

export default ContentContainer
