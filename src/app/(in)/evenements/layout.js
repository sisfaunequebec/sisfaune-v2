import { Box, Flex, Container, Stack } from '@chakra-ui/react'

const Layout = async ({ children }) => {
  return (
    <Stack as={Container} direction={['column', null, null, 'row']} maxWidth={'6xl'} spaceX={[0, null, null, 4]} overflowY={'auto'} height={'calc(100vh - 110px)'}>
      <Flex flex={[1]} position={'sticky'} top={0} p={4} bg={'blue.100'}>Filters</Flex>
      <Flex flex={[3]} p={4} bg={'gray.50'}>{children}</Flex>
    </Stack>
  )
}

export default Layout


