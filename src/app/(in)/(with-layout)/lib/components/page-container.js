import { Flex, Container } from '@chakra-ui/react'

const PageContainer = ({ children }) => {
  return (
    <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} fontSize={['md', null, 'sm']}>
      {children}
    </Flex>
  )
}

export default PageContainer