'use client'
import { useEffect, useCallback, useRef } from 'react'
import { useIntersectionObserver } from '@react-hooks-library/core'

import { Flex, Box, Stack, VStack, Text, IconButton, Link, LinkOverlay } from '@chakra-ui/react'
import { RxPencil2 } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

import useUsers from '@/lib/data/users/use-users'
import useUsersCount from '@/lib/data/users/use-users-count'

import { searchParams, urlKeys } from '@/lib/data/users/users-params'

import useDialog from '@/utils/use-dialog'
import EditUserDialog from './edit-user-dialog'

import { ListContainer, LinkListWrapper, LoadMoreButton } from '@/app/(in)/(with-layout)/lib/components/list'

import CenteredMessage from '@/app/lib/components/centered-message'

const PAGE_SIZE = 25

const NoUsers = () => {
  return (
    <CenteredMessage level={'info'} description={'Aucun utilisateur correspondant aux critères'} />
  )
}

const UserItem = ({ id, username, fullName, email, organisation, isActive, onClick }) => {
  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]} onClick={onClick} >
        <VStack alignItems={'flex-start'} gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex flex={1} color={'green.600'} _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>{fullName ?? username}</Text>&nbsp;
              { fullName && <Text>({username})</Text> }
            </Flex>
          </LinkOverlay>
          <Flex fontWeight={500} color='fg.muted'>{organisation ?? '\u00A0'}</Flex>
          <Flex>{email}</Flex>
        </VStack>
      </Stack>
      <IconButton as={Link} onClick={onClick} colorPalette={'green'} variant={'ghost'} rounded={'full'} size={['xs']}><RxPencil2 /></IconButton>
    </LinkListWrapper>
  )
}

const UsersList = () => {
  const inner = useRef(null)
  const { inView } = useIntersectionObserver(inner)

  const { ask: editUser, dialog: editUserDialog } = useDialog(EditUserDialog)

  const [ params ] = useQueryStates(searchParams, { urlKeys })

  const { data: total } = useUsersCount(params)

  const result = useUsers(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  const users = data ? [].concat(...data) : []
  const count = users.length

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

  const handleEditUser = useCallback(async (userId) => {
    const result = await editUser({ userId })
    return result
  }, [editUser])

  if (isEmpty) {
    return (
      <NoUsers />
    )
  }

  return (
    <>
      {editUserDialog}
      <ListContainer isLoading={isLoadingMore}>
        {users.map(user => {
          const { id } = user
          return (
            <UserItem key={id} {...user} onClick={e => { handleEditUser(id) }} />
          )
        })}
        {loadMoreButtonIsVisible && <LoadMoreButton label={'Utilisateurs'} count={count} total={total} isReachingEnd={isReachingEnd} isLoading={isLoadingMore} onClick={handleLoadMore} />}
      </ListContainer>
    </>
  )
}

export default UsersList
