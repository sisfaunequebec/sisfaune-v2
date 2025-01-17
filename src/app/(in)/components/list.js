import { HStack, LinkBox } from '@chakra-ui/react'

const LinkListWrapper = ({ href, children }) => {
  return (
    <LinkBox
      as={HStack}
      gap={4}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      ps={5}
      pe={5}
      py={3}
      borderBottomColor={'green.300'}
      borderBottomWidth={1}
      _first={{
        borderTopColor: 'green.300',
        borderTopWidth: 1
      }}
      _even={{ bg: 'white', _dark: { bg: 'black' } }}
      _odd={{ bg: 'green.50', _dark: { bg: 'green.900' } }}
      _hover={{
        bg: 'green.100',
        _dark: { bg: 'green.700' }
      }}
      cursor={'pointer'}
    >
      {children}
    </LinkBox>
  )
}

export {
  LinkListWrapper
}
