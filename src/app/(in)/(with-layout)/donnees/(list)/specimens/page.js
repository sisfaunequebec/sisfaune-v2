import { Flex, Container } from '@chakra-ui/react'

import PageContainer from '../../../lib/components/page-container'

import SpecimensList from './lib/containers/specimens-list'
import Filters from '../lib/containers/filters'

export const metadata = {
  title: 'Base de données - Spécimens | SIS Faune'
}

const Specimens = async () => {
  return (
    <>
      <PageContainer>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent='center' alignItems='stretch'>
          <SpecimensList />
        </Flex>
      </PageContainer>
    </>
  )
}

export default Specimens
