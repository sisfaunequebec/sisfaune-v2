'use client'
import { useIntersectionObserver } from '@react-hooks-library/core'
import { useCallback, useEffect, useRef } from 'react'

import NextLink from 'next/link'
import { usePathname, useSearchParams  } from 'next/navigation'

import { Flex, IconButton, LinkOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import { RxArrowRight } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import { isoUTCStringToFormat } from '@/utils/dates'

import useEvents from '@/lib/data/events/use-events'
import useEventsCount from '@/lib/data/events/use-events-count'

import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import { LinkListWrapper, ListContainer, LoadMoreButton } from '@/app/(in)/(with-layout)/lib/components/list'

import CenteredMessage from '@/app/lib/components/centered-message'

const PAGE_SIZE = 25

const NoEvents = () => {
  return (
    <CenteredMessage level={'info'} description={'Aucun événement correspondant aux critères'} />
  )
}

const ItemEvenement = ({ id, silabId, mapaqId, typeName, programName, localityName, submitterName, reportedAt }) => {
  const searchParams = useSearchParams()

  const currentFilters = searchParams.toString()
  const returnUrl = `/donnees/evenements?${currentFilters}`
  
  const href = `/donnees/evenements/${id}?return=${encodeURIComponent(returnUrl)}`

  const reportingDate = isoUTCStringToFormat(reportedAt)

  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]}>
        <VStack alignItems='flex-start' gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex as={NextLink} href={href} scroll={true} flex={1} color={'green.600'} _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>Événement&nbsp;{id}</Text>&nbsp;
              {mapaqId && <Text>(MAPAQ&nbsp;{mapaqId})</Text>}
            </Flex>
          </LinkOverlay>
          <Flex fontWeight={500} color={'fg.muted'}>{programName}</Flex>
          <Flex display={['none', null, null, 'inherit']}>Numéro SILAB&nbsp;:&nbsp;{silabId}</Flex>
        </VStack>
        <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}>
          <Flex as={Text} display={['none', null, null, 'inherit']} textAlign={'end'} truncate>{localityName ?? 'Localisation indéterminée'}</Flex>
          <Flex display={['none', null, null, 'inherit']}>Soumis par&nbsp;:&nbsp;{submitterName ?? 'indéterminé'}</Flex>
          <Flex color={'blue.600'}>Date du signalement : {reportingDate}</Flex>
        </VStack>
      </Stack>
      <IconButton as={NextLink} href={href} colorPalette={'green'} variant={'ghost'} rounded={'full'}size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

// const LoadMoreButton = ({ count, total, isReachingEnd, isLoading, onClick }) => {
//   const loadMoreButtonLabel = [`Événements 1 à ${count} de ${total}`, (isReachingEnd ? null : '')].filter(Boolean).join(' - ')

//   return (
//     <Button size={['lg', null, 'sm']} py={[6, null, 6]} borderRadius={0} variant={'surface'} colorPalette={'blue'} onClick={isReachingEnd ? null : onClick} loading={isLoading} disabled={isReachingEnd} alignItems={'center'}>{loadMoreButtonLabel} <RxPlus /></Button>
//   )
// }

const ListeEvenements = () => {
  const inner = useRef(null)

  const { inView } = useIntersectionObserver(inner)

  const [params] = useQueryStates(searchParams, { urlKeys })

  const { data: total } = useEventsCount(params)

  const result = useEvents(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  const events = data ? [].concat(...data) : []
  const count = events.length

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    // console.debug('useEffect', inView, isLoadingMore, size)
    setTimeout(() => {
      if (inView && !isLoadingMore) {
        handleLoadMore()
      }
    }, 500)
  }, [inView, size, isLoadingMore, handleLoadMore])

  const loadMoreButtonIsVisible = count > 0
  // const triggerIsVisible = (!isLoadingMore && !isReachingEnd)
  // console.debug(isReachingEnd, isLoadingMore, triggerIsVisible)

  if (!isLoadingMore && count === 0) {
    return (
      <NoEvents />
    )
  }

  return (
    <ListContainer isLoading={isLoadingMore}>
      {events.map((event, i) => {
        const { id } = event
        return (
          <ItemEvenement key={[id, i].join('-')} {...event} />
        )
      })}
      {/* <Flex flex={1} position={'absolute'} bottom={0} w={'full'} height={'300px'} maxH={'100vh'} border={'solid 1px red'} display={triggerIsVisible ? 'inherit' : 'none'} ref={inner} /> */}
      {loadMoreButtonIsVisible && <LoadMoreButton label={'Événements'} count={count} total={total} isReachingEnd={isReachingEnd} isLoading={isLoadingMore} onClick={handleLoadMore} />}
    </ListContainer>
  )
}

export default ListeEvenements
