import { Box, Flex, Container, Stack } from '@chakra-ui/react'

import { DataListItem } from '@/components/ui/data-list'
import { DataListRoot } from '@/components/ui/data-list'

const items = Array(100).fill(null).map((item, i) => {
  return {
    value: Math.round(Math.random() * 100),
    label: i + 1
  }
})

const Evenements = async () => {
  return (
    <Flex as={Container} direction={['column', null, null, 'row']} maxWidth={'6xl'} spaceX={[0, null, null, 4]} >

      <Flex flex={1} position={'sticky'} top={20} alignSelf={'flex-start'} bg={'gray.100'} width={'full'} p={4} pb={8}>Filtres</Flex>
      <Flex flex={3} p={4}>

        <DataListRoot size={'md'} divideY={'1px'} orientation={'horizontal'} w={'full'}>
          {items.map((item) => (
            <DataListItem
              pt={4}
              grow
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </DataListRoot>

      </Flex>

    </Flex>
  )
}

export default Evenements 
