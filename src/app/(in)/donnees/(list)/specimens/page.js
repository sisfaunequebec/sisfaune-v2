import { Flex, Container } from '@chakra-ui/react'

import SpecimensList from './lib/containers/specimens-list'
import Filters from '../lib/components/filters'

const Specimens = async () => {
  return (
    <>
      {/* <Toolbar /> */}
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} px={[0, 0, 6, 8]} pt={[0, 0, 6]} fontSize={['md', null, 'sm']}>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <SpecimensList />
        </Flex>
      </Flex>
    </>
  )
}

export default Specimens
