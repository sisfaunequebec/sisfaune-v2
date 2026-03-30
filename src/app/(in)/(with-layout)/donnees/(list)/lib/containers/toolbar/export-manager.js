'use client'
import { useCallback, useEffect } from 'react'

import { useSWRConfig } from 'swr'

import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'

import wait from '@/utils/wait'

import deleteExtractionAction from './delete-extraction.action'

import useTasks from '@/lib/data/tasks/use-tasks'

const TIMEAGO_FR = (number, index) => {
  return [
    ['À l\'instant', 'dans un instant'],
    ['Il y a %s secondes', 'dans %s secondes'],
    ['Il y a une minute', 'dans une minute'],
    ['Il y a %s minutes', 'dans %s minutes'],
    ['Il y a une heure', 'dans une heure'],
    ['Il y a %s heures', 'dans %s heures'],
    ['Hier', 'demain'],
    ['Il y a %s jours', 'dans %s jours'],
    ['Il y a une semaine', 'dans une semaine'],
    ['Il y a %s semaines', 'dans %s semaines'],
    ['Il y a un mois', 'dans un mois'],
    ['Il y a %s mois', 'dans %s mois'],
    ['Il y a un an', 'dans un an'],
    ['Il y a %s ans', 'dans %s ans'],
  ][index]
}

timeago.register('fr', TIMEAGO_FR)

import {
  ActionBar,
  Button,
  Portal,
  SegmentGroup,
  Text,
  VStack,
  Spinner, 
  HStack,
  IconButton,
  Separator,
  Icon,
  Link,
  CloseButton 
} from '@chakra-ui/react'

import { BiSolidCheckCircle, BiXCircle  } from 'react-icons/bi'

const PendingIndicator = () => {
  return (
    <Spinner size={'sm'} borderWidth={'1px'} animationDuration={'0.8s'} ms={0.5} me={0.5}  css={{'--spinner-track-color': 'colors.gray.200'}}/>
  )
}

const CompletedIndicator = () => {
  return (
   <Icon 
      as={BiSolidCheckCircle} 
      boxSize={5} 
      color={'green.400'} 
      me={0}
      cursor={'pointer'}
    />
  )
}

const DeleteButton = ({ onDelete, visible }) => {
  return (
    <IconButton
      borderRadius={'full'}
      variant={'ghost'}
      size={'2xs'}
      visibility={visible ? 'visible' : 'hidden'}
      onClick={onDelete}
    >
      <BiXCircle />
    </IconButton>
  )
}

const Task = (task) => {
  const { mutate } = useSWRConfig()

  const { id, status, updatedAt } = task

  const isCompleted = status === 'termine'

  const label = status === 'en_cours' ? 'En préparation' : 'Télécharger le fichier'
  const statusComponent = status === 'en_cours' ? <PendingIndicator /> : <CompletedIndicator />
  const textComponent = status === 'termine' ? <Link href={'#'} flex={1} textDecoration={'underline'} colorPalette={'blue'}>{label}</Link>: <Text flex={1}>{label}</Text>

  const handleDelete = useCallback(async (id) => {
    await deleteExtractionAction(id)
    await wait(1000)
    await mutate('/api/admin/tasks')
  }, [mutate])

  return (
    <HStack gap={2} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={8}>
      { statusComponent }
      { textComponent }
      <TimeAgo datetime={updatedAt} locale={'fr'} live={true} />
      <DeleteButton visible={isCompleted} onDelete={() => { handleDelete(id) }} />
    </HStack>
  )
}

const ExportManager = ({ isVisible = true, onClose }) => {
  const { data: tasks, isLoading } = useTasks()

  // useEffect(() => {
  //   console.debug('Updating tasks...', tasks?.map(t => t.id))
  // }, [tasks])

  if (isLoading) {
    return null
  }

  if (!tasks?.length) {
    return null
  }

  if (!isVisible) {
    return null
  }



  return (
    <ActionBar.Root open={true} placement={'bottom'}>
      <Portal>
        <ActionBar.Positioner zIndex={1001} justifyContent={'flex-end'} px={1} py={1}>
          <ActionBar.Content minWidth={400} fontSize={'sm'}>
            <VStack justifyContent={'stretch'} alignItems={'stretch'} gap={0} flex={1} px={1}>
              <HStack gap={1} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={10} fontSize={'md'} fontWeight={'medium'}>
                Vos extractions de données
                <CloseButton size={'2xs'} borderRadius={'full'} onClick={onClose} />
              </HStack>
              <Separator my={1} mb={2} />
              { tasks.map((task, i) => {
                const total = tasks.length
                const isLast = i + 1 === total
                return (
                  <>
                    <Task key={task.id} {...task} />
                    { !isLast && <Separator key={`${task.id}-separator`} my={1} /> }
                  </>
                )
              })}
            </VStack>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  )
}

export default ExportManager

