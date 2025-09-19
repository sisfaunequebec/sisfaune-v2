import { EmptyState, Flex, VStack } from '@chakra-ui/react'
import { RiInformationFill } from 'react-icons/ri'

const COLORS = {
  // info: 'blue.600',
  // warning: 'orange.600',
  error: 'red.600',
}

const TITLE_SIZES = {
  default: ['xl', null, 'lg'],
  sm: ['md', null, 'sm'],
}

const CenteredMessage = ({ title = 'Désolé', description, level = 'info', size = 'md', children }) => {
  const color = COLORS[level] ?? 'green.500'

  const titleSize = TITLE_SIZES[size] || TITLE_SIZES['default']

  return (
    <EmptyState.Root size={size} flex={1} alignSelf={'center'} justifySelf={'center'}>
      <EmptyState.Content gap={1}>
        <EmptyState.Indicator color={color}>
          <RiInformationFill  />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title fontSize={titleSize}>{title}</EmptyState.Title>
          {description && 
            <EmptyState.Description fontSize={['lg', null, 'md']}>
              {description}
            </EmptyState.Description>
          }
          { children && <Flex mt={4}>{ children }</Flex> }
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default CenteredMessage
