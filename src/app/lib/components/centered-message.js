import { EmptyState, Flex, VStack } from '@chakra-ui/react'
import { RiInformationFill } from 'react-icons/ri'

// const COLORS = {
//   info: 'blue.600',
//   warning: 'orange.600',
//   error: 'red.600',
// }

const CenteredMessage = ({ title = 'Désolé !', description, level = 'info', children }) => {
  // const color = COLORS[level]

  return (
    <EmptyState.Root size={['md']} flex={1} alignSelf={'center'} justifySelf={'center'}>
      <EmptyState.Content gap={2}>
        <EmptyState.Indicator color={'green.500'}>
          <RiInformationFill  />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title fontSize={['xl', null, 'lg']}>{title}</EmptyState.Title>
          {description && 
            <EmptyState.Description fontSize={['lg', null, 'md']}>
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
