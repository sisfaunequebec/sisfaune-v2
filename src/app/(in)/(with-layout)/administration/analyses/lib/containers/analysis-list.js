'use client'
import { useEffect, useCallback, useRef } from 'react'

import { useIntersectionObserver } from '@react-hooks-library/core'

import { Flex, Box, Stack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxArrowRight, RxPencil2 } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import useAnalyses from '@/lib/data/analyses/use-analyses'
import useAnalysesCount from '@/lib/data/analyses/use-analyses-count'

import { searchParams, urlKeys } from '@/lib/data/analyses/analyses-params'

import useDialog from '@/utils/use-dialog'
import EditAnalysisDialog from './edit-analysis-dialog'

import { ListContainer, LinkListWrapper, LoadMoreButton } from '@/app/(in)/(with-layout)/lib/components/list'

import CenteredMessage from '@/app/lib/components/centered-message'
import { parse } from 'path'

const PAGE_SIZE = 25

const NoAnalyses = () => {
  return (
    <CenteredMessage level={'info'} description={'Aucune analyse correspondant aux critères'} />
  )
}

const AnalysisItem = ({ id, name, code, groupName, sectorName, resultType, onClick }) => {
  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]} onClick={onClick}>
        <VStack alignItems='flex-start' gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex flex={1} color='green.600' _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>{name}</Text>&nbsp;
              {code && <Text>({code})</Text>}
            </Flex>
          </LinkOverlay>
          <Flex fontWeight={500} color='fg.muted'>Groupe : {groupName}</Flex>
          <Flex display={['none', null, null, 'inherit']}>Secteur : {sectorName}</Flex>
        </VStack>
      </Stack>
      <IconButton colorPalette={'green'} variant={'ghost'} rounded={'full'} size={['xs']} onClick={onClick}><RxPencil2 /></IconButton>
    </LinkListWrapper>
  )
}

const AnalysisList = () => {
  const inner = useRef(null)
  const { inView } = useIntersectionObserver(inner)

  const { ask: editAnalysis, dialog: editAnalysisDialog } = useDialog(EditAnalysisDialog)

  const [ params ] = useQueryStates(searchParams, { urlKeys })

  const { data: total } = useAnalysesCount(params)

  const result = useAnalyses(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  const analyses = data ? [].concat(...data) : []
  const count = analyses.length

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    setTimeout(() => {
      if (inView && !isLoadingMore) {
        handleLoadMore()
      }
    }, 500)
  }, [inView, size, isLoadingMore, handleLoadMore])

  const loadMoreButtonIsVisible = count > 0

  const handleEditAnalysis = useCallback(async (analysisId) => {
    await editAnalysis({ analysisId })
  }, [editAnalysis])

  if (isEmpty) {
    return (
      <NoAnalyses />
    )
  }

  return (
    <>
      {editAnalysisDialog}
      <ListContainer isLoading={isLoadingMore}>
        {analyses.map(analysis => {
          const { id } = analysis
          return (
            <AnalysisItem key={id} {...analysis} onClick={e => { handleEditAnalysis(id) }} />
          )
        })}
        {loadMoreButtonIsVisible && <LoadMoreButton label={'Analyses'} count={count} total={total} isReachingEnd={isReachingEnd} isLoading={isLoadingMore} onClick={handleLoadMore} />}
      </ListContainer>
    </>
  )
}

export default AnalysisList
