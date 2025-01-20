import { usePathname, useSearchParams } from 'next/navigation'

import NextLink from 'next/link'

import { Tabs, Link } from '@chakra-ui/react'

const EvenementsSpecimens = () => {
  const pathname = usePathname()
  const params = useSearchParams()

  const splitedPathname = pathname.split('/')
  const lastPathSegment = splitedPathname.at(-1)

  return (
    <Tabs.Root defaultValue='evenements' value={lastPathSegment} variant='subtle' size={['md', null, 'sm']} colorPalette='blue'>
      <Tabs.List>
        <Tabs.Trigger value='evenements' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href={`/donnees/evenements?${params}`}>Événements</NextLink>
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value='specimens' borderRadius='full'>
          <Link asChild unstyled>
            <NextLink href={`/donnees/specimens?${params}`}>Spécimens</NextLink>
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default EvenementsSpecimens
