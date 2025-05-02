'use client'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'

import NextLink from 'next/link'

import { Link, Tabs } from '@chakra-ui/react'

const StyledTrigger = ({ children, ...rest }) => {
  return (
    <Tabs.Trigger {...rest} borderRadius={['full', null, 'md']} borderBottomRadius={['full', null, 0]} borderBottomWidth={[null, null, '3px']}>
      {children}
    </Tabs.Trigger>
  )
}

const EvenementsSpecimens = () => {
  const params = useSearchParams()
  const segment = useSelectedLayoutSegment()

  return (
    <Tabs.Root defaultValue='evenements' value={segment} variant='subtle' size={['lg', null, 'sm']} colorPalette='green'>
      <Tabs.List>
        <StyledTrigger value='evenements'>
          <Link asChild unstyled>
            <NextLink href={`/donnees/evenements?${params}`}>Événements</NextLink>
          </Link>
        </StyledTrigger>
        <StyledTrigger value='specimens'>
          <Link asChild unstyled>
            <NextLink href={`/donnees/specimens?${params}`}>Spécimens</NextLink>
          </Link>
        </StyledTrigger>
      </Tabs.List>
    </Tabs.Root>
  )
}

export default EvenementsSpecimens
