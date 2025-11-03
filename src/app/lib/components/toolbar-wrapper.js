/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import { useWindowScroll } from '@uidotdev/usehooks'

import { Flex, Container, Button, IconButton, HStack } from '@chakra-ui/react'
import { RxArrowLeft, RxFileText } from 'react-icons/rx'

const ToolbarWrapper = ({ children }) => {
  const [{ y = 0 }] = useWindowScroll()
  const toolbarShadowSize = y > 70 ? 'md' : null

  return (
    <Flex
      flex={0}
      position={'sticky'}
      top={'70px'}
      alignSelf={'flex-start'}
      width={'full'}
      zIndex={1001}
      // shadow={[null, null, toolbarShadowSize]}
    >
      <Flex flex={1} bg={'white'} py={1}>
        <Container maxWidth={'6xl'} py={2}>
          {children}
        </Container>
      </Flex>
    </Flex>
  )
}

export default ToolbarWrapper
