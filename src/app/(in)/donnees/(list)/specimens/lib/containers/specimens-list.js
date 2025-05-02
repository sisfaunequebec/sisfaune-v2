'use client'

import { useEffect, useCallback, useRef } from 'react'

import { DateTime } from 'luxon'

import NextLink from 'next/link'

import { Flex, Stack, VStack, Text, IconButton, LinkOverlay, AbsoluteCenter, EmptyState, Container } from '@chakra-ui/react'
import { Button } from '@/app/lib/components/ui/button'
import { RxArrowRight, RxPlus, RxPlusCircled } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import useSpecimens from '@/lib/data/specimens/use-specimens'
import useSpecimensCount from '@/lib/data/specimens/use-specimens-count'

import { searchParams, urlKeys } from '@/lib/data/events/events-params'

import { ListContainer, LinkListWrapper, LoadMoreButton } from '@/app/(in)/lib/components/list'

import CenteredMessage from '@/app/lib/components/centered-message'

const PAGE_SIZE = 25

const NoSpecimens = () => {
  return (
    <CenteredMessage level={'info'} title={'Désolé'} description={'Aucun spécimen correspondant aux critères'} />
  )
}

const SpecimenItem = ({ id, eventId, specimenNumber, specieName, specieBinome, cqsasNumber, localityName, submitterName, reportedAt }) => {
  const href = `/donnees/evenements/${eventId}`

  const reportingDate = reportedAt ? DateTime.fromISO(reportedAt).toFormat('yyyy-LL-dd') : null

  // const handleDelete = useCallback(() => {
  //   window.alert(`Effacer specimen id = ${id}`)
  // }, [id])

  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]}>
        <VStack alignItems='flex-start' gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <NextLink href={href} color='green.600' _dark={{ color: 'green.200' }}>
              <Text fontWeight={500} color='green.600'>Spécimen no {specimenNumber}</Text>
            </NextLink>
          </LinkOverlay>
          <Text minWidth={0} fontWeight={500} color={'fg.muted'}>{specieName} ({specieBinome})</Text>
          <Flex display={['none', null, null, 'inherit']}>Numéro CQSAS : {cqsasNumber}</Flex>
        </VStack>
        <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}>
          <Flex as={Text} truncate display={['none', null, null, 'inherit']} textAlign={'end'} minWidth={0}>{localityName ?? 'Localisation indéterminée'}</Flex>
          <Flex as={Text} display={['none', null, null, 'inherit']} textAlign={'end'}>Soumis par : {submitterName ?? 'indéterminé'}</Flex>
          <Flex as={Text} color='blue.600' textAlign={'end'}>Date du signalement : {reportingDate}</Flex>
        </VStack>
      </Stack>
      <IconButton as={NextLink} href={href} scroll colorPalette='green' variant='ghost' rounded='full' size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

// const LoadMoreButton = ({ count, total, isReachingEnd, isLoading, onClick }) => {
//   const loadMoreButtonLabel = [`Événements 1 à ${count} de ${total}`, (isReachingEnd ? null : '')].filter(Boolean).join(' - ')

//   return (
//     <Button size={['lg', null, 'sm']} py={[6, null, 6]} borderRadius={0} variant={'surface'} colorPalette={'blue'} onClick={isReachingEnd ? null : onClick} loading={isLoading} disabled={isReachingEnd} alignItems={'center'}>{loadMoreButtonLabel} <RxPlus /></Button>
//   )
// }

const SpecimensList = () => {
  const [params] = useQueryStates(searchParams, { urlKeys })

  const { data: total } = useSpecimensCount(params)

  const result = useSpecimens(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  const specimens = data ? [].concat(...data) : []
  const count = specimens.length

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  const loadMoreButtonLabel = [`Spécimens 1 à ${count} de ${total}`, (isReachingEnd ? null : 'Cliquer pour charger la suite')].filter(Boolean).join(' - ')

  const loadMoreButtonIsVisible = specimens.length > 0
  const triggerIsVisible = (!isLoadingMore && !isReachingEnd)
  // console.debug(isReachingEnd, isLoadingMore, triggerIsVisible)

  if (!isLoadingMore && count === 0) {
    return (
      <NoSpecimens />
    )
  }

  return (
    <ListContainer isLoading={isLoadingMore}>
      {specimens.map((specimen, i) => {
        const { id } = specimen
        return (
          <SpecimenItem key={[id, i].join('-')} {...specimen} />
        )
      })}
      {loadMoreButtonIsVisible && <LoadMoreButton label={'Spécimens'} count={count} total={total} isReachingEnd={isReachingEnd} isLoading={isLoadingMore} onClick={handleLoadMore} />}
    </ListContainer>
  )
}

export default SpecimensList
