"use client"
import NextLink from 'next/link'

import { Flex, IconButton, LinkOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'

import PageContainer from '../../lib/components/page-container'
import SidebarContainer from '../../lib/components/sidebar-container'
import ContentContainer from '../../lib/components/content-container'
import { ListContainer, LinkListWrapper } from '../../lib/components/list'

import Toolbar from '../lib/components/toolbar'

// export const metadata = {
//   title: 'Administration - Tables de valeurs | SIS Faune'
// }

const TableItem = ({ name, description = 'description', url = '' }) => {
  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]}>
        <VStack alignItems='flex-start' gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex as={NextLink} href={`valeurs/${url}`} scroll={true} flex={1} color='green.600' _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>{name}</Text>&nbsp;
            </Flex>
          </LinkOverlay>
          <Flex display={['none', null, null, 'inherit']}>{description}</Flex>
        </VStack>
      </Stack>
      <IconButton colorPalette='green' variant='ghost' rounded='full' size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

const tables = [
  { name: 'Gestion des programmes', description: 'Cette liste apparaît dans la section Identification', url: 'programmes' }, 
  { name: 'Gestion des provenances', description: 'Cette liste apparaît dans la section Identification', url: 'provenances' },
  { name: 'Gestion des intervenants', description: 'Cette liste apparaît dans la section Personnes impliquées (champ "récolté par")', url: 'intervenants'  },
  { name: 'Gestion des laboratoires de destination', description: 'Cette liste apparaît dans la section Expédition des spécimens', url: 'laboratoires'  },
  { name: 'Gestion des causes de mortalité', description: 'Cette liste apparaît dans la section Identification des spécimens', url: 'mortalite'  },
  { name: 'Gestion des organismes responsables', description: 'Cette liste apparaît dans la section Détails sur l\'euthanasie', url: 'organismes'  },
  { name: 'Gestion des méthodes d\'euthasanie', description: 'Cette liste apparaît dans la section Détails sur l\'euthanasie', url: 'euthanasie'  }
]

const TablesList = () => {
  return (
    <ListContainer isLoading={false}>
      {tables.map(table => {
        const { name, description, url } = table
        return (
          <TableItem key={name} name={name} description={description} url={url} />
        )
      })}
    </ListContainer>
  )

}

const TablesAdminPage = async () => {
  return (
    <>
      <Toolbar />
      <PageContainer>
        <SidebarContainer/>
        <ContentContainer>    
          <TablesList />
        </ContentContainer>    
      </PageContainer>
    </>
  )
}

export default TablesAdminPage
