import { Flex, Container, Stack } from '@chakra-ui/react'

const Layout = async ({ children }) => {
  return (
    // <Container maxWidth={'4xl'}>{children}</Container> 
    <Stack as={Container} direction={['column', null, null, 'row']} maxWidth={'6xl'} spaceX={[0, null, null, 4]}>
      <Flex flex={[1, null, null, 2]} bg={'blue.100'}>Filters</Flex>
      <Flex flex={[1, null, null, 4]}>{children}</Flex>
    </Stack>
  )
}

export default Layout


