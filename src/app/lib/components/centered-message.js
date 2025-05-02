import { Flex, VStack, EmptyState } from  '@chakra-ui/react'
import { RxExclamationTriangle } from 'react-icons/rx'

const COLORS = {
  info: 'green.500',
  warning: 'orange.500',
  error: 'ref.500',
}

const CenteredMessage = ({ title = 'Désolé', description, level = 'info', children }) => {
  const color = COLORS[level]

  return (
    <EmptyState.Root size={['md']} flex={1} alignSelf={'center'} justifySelf={'center'}>
      <EmptyState.Content gap={4}>
        <EmptyState.Indicator color={color}>
          <RxExclamationTriangle />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title fontSize={['2xl', null, 'xl']}>{title}</EmptyState.Title>
          {description && 
            <EmptyState.Description fontSize={['xl', null, 'lg']}>
              {description}
            </EmptyState.Description>
          }
          <Flex mt={4}>{ children }</Flex>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default CenteredMessage
