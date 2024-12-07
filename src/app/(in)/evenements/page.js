// import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs } from '@chakra-ui/react'

import { SegmentedControl } from '@/components/ui/segmented-control'

import Toolbar from './components/toolbar'

const items = Array(20).fill(null).map((item, i) => {
  return {
    value: i,
    label: i + 1
  }
})

const ListItem = () => {
  return (
    <Flex
      p={4}
      borderBottomColor={'green.300'}
      borderBottomWidth={1}
      _first={{
        borderTopColor: 'green.300',
        borderTopWidth: 1
      }}
      _odd={{ bg: 'white' }} 
      _even={{ bg: 'green.50' }}
      _hover={{
         bg: 'green.100'
      }}
    >
      Item
    </Flex>
  )
}

const Evenements = async () => {

  // const [{ x, y }, scrollTo] = useWindowScroll()

  return (

    <>
      <Toolbar />
 

    <Flex as={Container} direction={['column', null, null, 'row']} maxWidth={'4xl'} spaceX={[0, null, null, 4]} spaceY={[4, null, null, 0]}>

      {/* <Flex
        flex={1}
        position={'sticky'}
        top={'170px'}
        alignSelf={'flex-start'}
        width={'full'}
        p={4}
        pb={8}
        // bg={'blue.200'}
        // h={'100%'}
        // minH={['auto', null, null, '100vh']}
      >
<Collapsible.Root>
  <Collapsible.Trigger>Filtres</Collapsible.Trigger>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.Root>
      </Flex> */}
      
      <Flex flex={3} py={4} alignItems={'stretch'}>

        <VStack alignItems={'stretch'} flex={1} gap={0}>
          {items.map((item) => (
            <ListItem key={item.value} />
          ))}
        </VStack>

      </Flex>

    </Flex>
    </>
  )
}

export default Evenements 
