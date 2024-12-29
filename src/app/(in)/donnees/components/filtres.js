import { Flex } from '@chakra-ui/react'

const Filtres = () => {
  return (
    <Flex flex={2} p={4} px={6} alignItems={'stretch'} bg={'blue.100'} borderColor={'blue.300'} borderTopWidth={1} hideBelow={'md'}>
      <Flex position={'sticky'} top={145} alignSelf={'flex-start'} zIndex={1000} >
        Filtres
      </Flex>
    </Flex>
  )
}

export default Filtres