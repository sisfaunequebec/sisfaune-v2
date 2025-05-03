import { useSelectedLayoutSegment } from 'next/navigation'

import NextLink from 'next/link'

import { Link, Tabs } from '@chakra-ui/react'

const DataAdminTabs = () => {
  const segment = useSelectedLayoutSegment()

  return (
    <Tabs.Root defaultValue='donnees' value={segment} variant='subtle' size={['lg', null, 'sm']} colorPalette='green' hideBelow='md'>
      <Tabs.List>
        <Tabs.Trigger value='donnees' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href='/donnees/evenements'>Base de données</NextLink>
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value='administration' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href='/administration/utilisateurs'>Administration</NextLink>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default DataAdminTabs
