import { usePathname } from 'next/navigation'

import NextLink from 'next/link'

import { Tabs, Link } from '@chakra-ui/react'

const DonneesAdministration = () => {
  const pathname = usePathname()
  const splitedPathname = pathname.split('/')
  const lastPathSegment = splitedPathname.at(-1)

  return (
    <Tabs.Root defaultValue='donnees' value={lastPathSegment} variant='subtle' size={['md', null, 'sm']} colorPalette='green' hideBelow='md'>
      <Tabs.List>
        <Tabs.Trigger value='donnees' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href='/donnees/evenements'>Base de données</NextLink>
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value='administration' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href='/administration'>Administration</NextLink>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default DonneesAdministration
