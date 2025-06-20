import { Button } from '@/app/lib/components/ui/button'
import { HStack, LinkBox, VStack } from '@chakra-ui/react'
import { RxPlus } from 'react-icons/rx'

const ListContainer = ({ children, isLoading }) => {
  return (
    <VStack position={'relative'} alignItems={'stretch'} justifyContent={'stretch'} flex={1} gap={0} opacity={isLoading && 0.5} mb={[0, null, 2]}>
      { children }
    </VStack>
  )
}

const LinkListWrapper = ({ href, children }) => {
  return (
    <LinkBox
      as={HStack}
      gap={2}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      ps={4}
      pe={3}
      py={3}
      borderBottomColor='green.300'
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
      cursor='pointer'
    >
      {children}
    </LinkBox>
  )
}

const LoadMoreButton = ({ count, total, label = 'Items', isReachingEnd, isLoading, onClick }) => {
  const loadMoreButtonLabel = [`${label} 1 à ${count} de ${total}`, (isReachingEnd ? null : '')].filter(Boolean).join(' - ')

  return (
    <Button size={['lg', null, 'sm']} py={[6, null, 6]} mt={[0, null, 2]} borderRadius={0} variant={'surface'} colorPalette={'blue'} onClick={isReachingEnd ? null : onClick} loading={isLoading} disabled={isReachingEnd} alignItems={'center'}>
      { loadMoreButtonLabel }
      { !isReachingEnd && <RxPlus /> }
    </Button>
  )
}

export {
  LinkListWrapper,
  ListContainer,
  LoadMoreButton
}
