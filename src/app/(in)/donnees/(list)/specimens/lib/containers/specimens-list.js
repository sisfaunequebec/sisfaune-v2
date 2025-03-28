'use client'

import { useEffect, useCallback, useRef } from 'react'

import { DateTime } from 'luxon'

import NextLink from 'next/link'

import { Flex, Stack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { RxArrowRight } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import useSpecimens from '@/logic/data/specimens/use-specimens'
import { searchParams, urlKeys } from '@/logic/data/events/events-params'

import { LinkListWrapper } from '@/app/(in)/lib/components/list'

// "id": 13866,
// "eventId": 8766,
// "specimenNumber": "8766.1",
// "specieName": "Raton laveur",
// "specieBinome": "Procyon lotor",
// "cqsasNumber": null,
// "reportedAt": "2007-06-21T00:00:00.000Z",
// "submitterName": "Pierre Canac-Marquis"

const SpecimenItem = ({ id, eventId, specimenNumber, specieName, specieBinome, cqsasNumber, localityName, submitterName, reportedAt }) => {
  const href = `/donnees/evenements/${eventId}`

  const reportingDate = reportedAt ? DateTime.fromISO(reportedAt).toFormat('yyyy-LL-dd') : null

  // const handleDelete = useCallback(() => {
  //   window.alert(`Effacer specimen id = ${id}`)
  // }, [id])

  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]}>
        <VStack alignItems={'flex-start'} gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <NextLink href={href} color={'green.600'} _dark={{ color: 'green.200' }}>
              <Text fontWeight={500} color='green.600'>Spécimen no {specimenNumber}</Text>
            </NextLink>
          </LinkOverlay>
          <Flex fontWeight={500} color={'fg.muted'}>{specieName} (<Text fontStyle={'italic'}>{specieBinome}</Text>)</Flex>
          <Flex display={['none', null, null, 'inherit']}>Numéro CQSAS : {cqsasNumber}</Flex>
        </VStack>
        <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}>
          <Flex display={['none', null, null, 'inherit']}>Soumis par : {submitterName}</Flex>
          <Flex color={'blue.600'}>Date du signalement : {reportingDate}</Flex>
          <Flex display={['none', null, null, 'inherit']}>Municipalité : {localityName ?? 'indéterminée'}</Flex>
        </VStack>
      </Stack>
      <IconButton as={NextLink} href={href} scroll colorPalette={'green'} variant={'ghost'} rounded={'full'} size={['xs']}><RxArrowRight /></IconButton>
    </LinkListWrapper>
  )
}

const PAGE_SIZE = 25

const SpecimensList = () => {
  const [params] = useQueryStates(searchParams, { urlKeys })

  const result = useSpecimens(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  const specimens = data ? [].concat(...data) : []
  const total = specimens.length

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  const loadMoreButtonLabel = [`Spécimens 1 à ${total} `, (isReachingEnd ? null : 'Cliquer pour charger la suite')].filter(Boolean).join(' - ')

  const loadMoreButtonIsVisible = specimens.length > 0
  const triggerIsVisible = (!isLoadingMore && !isReachingEnd)
  // console.debug(isReachingEnd, isLoadingMore, triggerIsVisible)

  return (
    <VStack position={'relative'} alignItems={'stretch'} flex={1} gap={0} justifyContent={'stretch'} opacity={isLoadingMore && 0.5} mb={2}>
      {specimens.map(specimen => {
        const { id } = specimen
        return (
          <SpecimenItem key={id} {...specimen} />
        )
      })}
      { loadMoreButtonIsVisible && <Button mt={2} p={4} variant={'surface'} colorPalette={'blue'} onClick={isReachingEnd ? null : handleLoadMore} loading={isLoadingMore}>{loadMoreButtonLabel}</Button> }
    </VStack>
  )
}

export default SpecimensList
