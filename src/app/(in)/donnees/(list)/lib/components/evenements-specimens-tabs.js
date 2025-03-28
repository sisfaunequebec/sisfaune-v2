import { usePathname, useSearchParams } from 'next/navigation'

import NextLink from 'next/link'

import { Tabs, Link } from '@chakra-ui/react'

const StyledTrigger = ({ children, ...rest }) => {
  return (
    <Tabs.Trigger {...rest} borderRadius={['full', null, 'md']} borderBottomRadius={['full', null, 0]} borderBottomWidth={[null, null, '3px']}>
      { children }
   </Tabs.Trigger>
  )
}

const EvenementsSpecimens = () => {
  const pathname = usePathname()
  const params = useSearchParams()

  const splitedPathname = pathname.split('/')
  const lastPathSegment = splitedPathname.at(-1)

  return (
    <Tabs.Root defaultValue={'evenements'} value={lastPathSegment} variant={'subtle'} size={['md', null, 'sm']} colorPalette={'blue'}>
      <Tabs.List>
        <StyledTrigger value={'evenements'}>
          <Link asChild unstyled>
            <NextLink href={`/donnees/evenements?${params}`}>Événements</NextLink>
          </Link>
        </StyledTrigger>
        <StyledTrigger value={'specimens'}>
          <Link asChild unstyled>
            <NextLink href={`/donnees/specimens?${params}`}>Spécimens</NextLink>
          </Link>
        </StyledTrigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default EvenementsSpecimens
