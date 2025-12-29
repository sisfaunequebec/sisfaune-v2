import { Box, Flex, Container, VStack, AbsoluteCenter, Icon, IconButton, Text,  HStack, Separator, Fieldset, Input, Field as ChakraField } from '@chakra-ui/react'
import { Children } from 'react'

const Header = ({ name, children, ...rest }) => { 
  return (  
    <ChakraField.Root justifyContent={'stretch'} {...rest}>
      <Flex direction={'row'} alignItems={'center'} w={'full'} >
        <ChakraField.Label fontWeight={'medium'} fontSize={['md', null, 'sm']} color={'gray.600'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
          {name}
        </ChakraField.Label>  
        { children }
      </Flex>
    </ChakraField.Root>
  )
}

const Row = ({ label, children }) => {
  return (
    <ChakraField.Root justifyContent={'stretch'}>
      <Flex direction={'row'} w={'full'} alignItems={'flex-start'}>
        <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={0} lineHeight={'shorter'}>
          {label}
        </ChakraField.Label>
        <HStack w={'full'} flex={2} gap={2} justifyContent={'space-between'}>
          { children }
        </HStack>
      </Flex>
    </ChakraField.Root>
  )
}

export {
  Header,
  Row
} 