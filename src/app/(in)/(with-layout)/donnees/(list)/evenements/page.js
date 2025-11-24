// 'use client'

import { Flex } from '@chakra-ui/react'

import PageContainer from '../../../lib/components/page-container'
import ContentContainer from '../../../lib/components/content-container'

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
        <ContentContainer> 
          <EventsList />
        </ContentContainer> 
      </PageContainer>
    </>
  )
}

export default Evenements
