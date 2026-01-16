'use client'
import { useEffect, useCallback, useRef } from 'react'

import { Flex, Box, Stack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { RxPencil2 } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import { getUsers, getUsersCount } from '@/lib/data/users/service'
import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'

import { searchParams, urlKeys } from '@/lib/data/users/users-params'

import useDialog from '@/utils/use-dialog'
import EditUserDialog from './edit-user-dialog'

import { ListContainer, LinkListWrapper, LoadMoreButton } from '@/app/(in)/(with-layout)/lib/components/list'

import CenteredMessage from '@/app/lib/components/centered-message'

const NoUsers = () => {
  return (
    <CenteredMessage level={'info'} description={'Aucun utilisateur correspondant aux critères'} />
  )
}

const UserItem = ({ id, username, fullName, email, organisation, isActive, onClick }) => {
  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]} onClick={onClick} alignItems={'center'}>
        <VStack alignItems={'flex-start'} gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex flex={1} color={'green.600'} _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>{fullName ?? username}</Text>&nbsp;
              { fullName && <Text>({username})</Text> }
            </Flex>
          </LinkOverlay>
          <Flex fontWeight={500} color='fg.muted'>{organisation ?? '\u00A0'}</Flex>
          <Flex display={['none', null, null, 'inherit']}>{email}</Flex>
        </VStack>
        <IconButton colorPalette={'green'} variant={'ghost'} rounded={'full'} size={['xs']}><RxPencil2 /></IconButton>
      </Stack>
    </LinkListWrapper>
  )
}

const getNextParams = (queryParams) => {
  const { queryKey, pageParam } = queryParams
  const [ _, params ] = queryKey
  const nextParams = {
    ...params,
    offset: pageParam
  }
  return nextParams
}

const useUsers = (params) => {
  const result = useInfiniteQuery({
    queryKey: ['users', {...params}],
    queryFn: (pageParams) => getUsers(getNextParams(pageParams)),
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage?.payload?.length < 25) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  const { data, hasNextPage, isLoading, isPending, isFetching, fetchNextPage } = result
  const pages = data?.pages

  const users = pages ? [].concat(...pages.map(p => p.payload)) : []
  const total = pages ? pages[0].meta.total : 0

  return {
    users, total, hasNextPage, isLoading, isPending, isFetching, fetchNextPage
  }
}

const UsersList = () => {
  const { ask: editUser, dialog: editUserDialog } = useDialog(EditUserDialog)

  const [ params ] = useQueryStates(searchParams, { urlKeys })

  const { users, total, hasNextPage, isLoading, isPending, isFetching, fetchNextPage } = useUsers(params)

  const count = users.length

  const isEmpty = !isPending && count === 0
  const loadMoreButtonIsVisible = count > 0

  const handleEditUser = useCallback(async (userId) => {
    const result = await editUser({ userId })
    if (result) {
      console.debug('Edit result', result)
    }
  }, [editUser])

  if (isEmpty) {
    return (
      <NoUsers />
    )
  }

  return (
    <>
      {editUserDialog}
      <ListContainer isLoading={isFetching}>
        {users.map(user => {
          const { id } = user
          return (
            <UserItem key={id} {...user} onClick={e => { handleEditUser(id) }} />
          )
        })}
        {loadMoreButtonIsVisible && <LoadMoreButton label={'Utilisateurs'} count={count} total={total} isReachingEnd={!hasNextPage} isLoading={isFetching} onClick={fetchNextPage} />}
      </ListContainer>
    </>
  )
}

export default UsersList
