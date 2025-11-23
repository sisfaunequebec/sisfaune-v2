// 'use client'

import { Flex } from '@chakra-ui/react'

import PageContainer from '../../../lib/components/page-container'

import EventsList from './lib/containers/events-list'
import Filters from '../lib/containers/filters'

export const metadata = {
  title: 'Base de données - Événements | SIS Faune'
}

const Evenements = async () => {
  return (
    <>
      <PageContainer>
        <Filters />
        <Flex flex={5} ps={[0, null, 2]} justifyContent={'center'} alignItems={'stretch'}>
          <EventsList />
        </Flex>
      </PageContainer>
    </>
  )
}

export default Evenements
