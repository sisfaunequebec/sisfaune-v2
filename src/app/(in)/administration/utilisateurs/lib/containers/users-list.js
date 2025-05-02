'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useIntersectionObserver } from '@react-hooks-library/core'

import { DateTime } from 'luxon'

import NextLink from 'next/link'

import { Flex, Box, Stack, VStack, Text, IconButton, LinkOverlay } from '@chakra-ui/react'
import { Button } from '@/app/lib/components/ui/button'
import { RxArrowRight } from 'react-icons/rx'

import { useQueryStates } from 'nuqs'

// import useUsers from '@/logic/data/users/use-users'
import useUsers from '@/lib/data/users/use-users'
import { searchParams, urlKeys } from '@/lib/data/users/users-params'

import useDialog from '@/utilitaires/use-dialog'
import EditUserDialog from './edit-user-dialog'

import { ListContainer, LinkListWrapper, LoadMoreButton } from '@/app/(in)/lib/components/list'

const UserItem = ({ id, username, fullName, email, organisation, isActive, onClick }) => {
  // const href = `/donnees/evenements/${id}`

  // const reportingDate = reportedAt ? DateTime.fromISO(reportedAt).toFormat('yyyy-LL-dd') : null

  return (
    <LinkListWrapper>
      <Stack flex={1} direction={['column', null, null, 'row']} gap={[0.4, null, null, 1]} onClick={onClick}>
        <VStack alignItems='flex-start' gap={0.4} flex={1}>
          <LinkOverlay asChild>
            <Flex flex={1} color='green.600' _dark={{ color: 'green.200' }}>
              <Text fontWeight={500}>{fullName ?? username}</Text>&nbsp;
              { fullName && <Text>({username})</Text> }
            </Flex>
          </LinkOverlay>
          <Flex fontWeight={500} color='fg.muted'>{organisation ?? '\u00A0'}</Flex>
          <Flex display={['none', null, null, 'inherit']}>{email}</Flex>
        </VStack>
        {/* <VStack alignItems={['flex-start', null, null, 'flex-end']} gap={0.4} flex={1}> */}
          {/* <Flex display={['none', null, null, 'inherit']}>Statut : {isActive ? 'Actif' : 'Inactif'}</Flex> */}
          {/* <Flex color={'blue.600'}>Date du signalement : {reportingDate}</Flex>
          <Flex display={['none', null, null, 'inherit']}>Municipalité : {localityName ?? 'indéterminée'}</Flex> */}
        {/* </VStack> */}
      </Stack>
      {/* <IconButton as={NextLink} href={href} scroll colorPalette={'green'} variant={'ghost'} rounded={'full'} size={['xs']}><RxArrowRight /></IconButton> */}
    </LinkListWrapper>
  )
}

const PAGE_SIZE = 25

const UsersList = () => {
  // const inner = useRef(null)

  const { ask: editUser, dialog: editUserDialog } = useDialog(EditUserDialog)

  // const { inView } = useIntersectionObserver(inner)

  const [ params ] = useQueryStates(searchParams, { urlKeys })

  const result = useUsers(params, PAGE_SIZE)
  const { data = [], isLoading, size, setSize } = result

  const handleLoadMore = useCallback(() => {
    if (isLoading) {
      return
    }
    setSize(size + 1)
  }, [setSize, size, isLoading])

  // const data = [
  //   { id: 1, username: 'admin', fullName: 'Administrateur du système', email: 'admin@sisfaunequebec.ca', organisation: 'MAPAQ', isActive: true }
  // ]

  const users = data ? [].concat(...data) : []
  const total = users.length

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  // useEffect(() => {
  //   // console.debug('useEffect', inView, isLoadingMore, size)
  //   setTimeout(() => {
  //     if (inView && !isLoadingMore) {
  //       handleLoadMore()
  //     }
  //   }, 500)
  // }, [inView, size, isLoadingMore, handleLoadMore])

  // const loadMoreButtonLabel = [`Utilisateurs 1 à ${total} `, (isReachingEnd ? null : 'Cliquer pour charger la suite')].filter(Boolean).join(' - ')

  const loadMoreButtonIsVisible = users.length > 0
  const triggerIsVisible = (!isLoadingMore && !isReachingEnd)
  // console.debug(isReachingEnd, isLoadingMore, triggerIsVisible)

  const handleEditUser = useCallback(async (id) => {
    const result = await editUser(id)
    if (result) {
      console.debug('Edit !!!')
    }
  }, [editUser])

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
        {/* <Flex flex={1} position={'absolute'} bottom={0} w={'full'} height={'300px'} maxH={'100vh'} border={'solid 1px red'} display={triggerIsVisible ? 'inherit' : 'none'} ref={inner} /> */}
        {loadMoreButtonIsVisible && <LoadMoreButton label={'Utilisateurs'} count={0} total={total} isReachingEnd={isReachingEnd} isLoading={isLoadingMore} onClick={handleLoadMore} />}      </ListContainer>
    </>
  )
}

export default UsersList
