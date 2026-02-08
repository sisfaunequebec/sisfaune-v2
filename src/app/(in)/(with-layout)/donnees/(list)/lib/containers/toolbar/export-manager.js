'use client'
import { useState } from 'react'

import useTasks from '@/lib/data/tasks/use-tasks'

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
  Icon ,
  Link
} from '@chakra-ui/react'

import { BiSolidCheckCircle, BiXCircle  } from 'react-icons/bi'

const PendingIndicator = () => {
  return (
    <Spinner size={'md'} borderWidth={'1px'} animationDuration={'0.8s'} me={1} css={{'--spinner-track-color': 'colors.gray.200'}}/>
  )
}

const CompletedIndicator = () => {
  const [isHovered, setIsHovered] = useState(false)
  const color = isHovered ? 'gray.900' : 'green.400'
  const icon = isHovered ? BiXCircle : BiSolidCheckCircle
  const size = isHovered ? 5 : 7
  const me = isHovered ? 1 : 0
  return (
   <Icon 
      as={icon} 
      boxSize={size} 
      color={color} 
      me={me}
      cursor={'pointer'}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    />
  )
}

const Task = (task) => {
  const [isHovered, setIsHovered] = useState(false)

  const { status } = task
  const label = status === 'en_cours' ? 'Fichier en préparation' : 'Télécharger'
  const statusComponent = status === 'en_cours' ? <PendingIndicator /> : <CompletedIndicator />
  const textComponent = status === 'termine' ? <Link href={'#'} flex={1} textDecoration={'underline'} colorPalette={'blue'}>{label}</Link>: <Text flex={1}>{label}</Text>

  return (
    <HStack gap={2} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={8}>
      { textComponent }
      { statusComponent }
    </HStack>
  )
}

const ExportManager = () => {
  const { data: tasks, isLoading } = useTasks()

  if (isLoading) {
    return null
  }

  if (!tasks.length) {
    return null
  }

  return (
    <ActionBar.Root open={true} placement={'bottom'}>
      <Portal>
        <ActionBar.Positioner zIndex={1001} justifyContent={'flex-start'} px={4}>
          <ActionBar.Content minWidth={300} fontSize={'sm'}>
            <VStack justifyContent={'stretch'} alignItems={'stretch'} gap={0} flex={1} px={1}>
              <HStack gap={1} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={10} fontWeight={'medium'}>
                Exportations de données
              </HStack>
              <Separator my={1} />
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
