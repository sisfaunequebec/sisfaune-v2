import { Flex } from '@chakra-ui/react'

const SidebarContainer = ({ children }) => {
  return (
    <Flex position='sticky' flex={2} h='calc(100vh - 130px)' overflowY='auto' top={130} p={3} px={6} alignItems='stretch' bg='blue.100' _dark={{ bg: 'blue.900' }} borderColor='blue.300' borderTopWidth={1} borderBottomWidth={0} hideBelow='md'>
      {children}
    </Flex>
  )
}

export default SidebarContainer