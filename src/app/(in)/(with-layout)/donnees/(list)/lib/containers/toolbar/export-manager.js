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
  // const [isHovered, setIsHovered] = useState(false)
  // const color = isHovered ? 'gray.900' : 'green.400'
  // const icon = isHovered ? BiXCircle : BiSolidCheckCircle
  // const size = isHovered ? 5 : 7
  // const me = isHovered ? 1 : 0
  return (
   <Icon 
      as={BiSolidCheckCircle} 
      boxSize={5} 
      color={'green.400'} 
      me={0}
      cursor={'pointer'}
      // onMouseOver={() => setIsHovered(true)}
      // onMouseOut={() => setIsHovered(false)}
    />
  )
}

const DeleteButton = ({ onClick }) => {
  return (
    <IconButton
      borderRadius={'full'}
      variant={'ghost'}
      size={'2xs'}
      // onClick={onClick}
    >
      <BiXCircle />
    </IconButton>
  )
}

const Task = (task) => {
  // const [isHovered, setIsHovered] = useState(false)

  const { status } = task

  const isCompleted = status === 'termine'

  const label = status === 'en_cours' ? 'Fichier en préparation' : 'Télécharger'
  const statusComponent = status === 'en_cours' ? <PendingIndicator /> : <CompletedIndicator />
  const textComponent = status === 'termine' ? <Link href={'#'} flex={1} textDecoration={'underline'} colorPalette={'blue'}>{label}</Link>: <Text flex={1}>{label}</Text>

  return (
    <HStack gap={2} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={8}>
      { statusComponent }
      { textComponent }
      { isCompleted && <DeleteButton /> }
    </HStack>
  )
}

const ExportManager = ({ isVisible = true, onClose }) => {
  const { data: tasks, isLoading } = useTasks()

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
        <ActionBar.Positioner zIndex={1001} justifyContent={'flex-end'} px={12} py={12}>
          <ActionBar.Content minWidth={300} fontSize={'sm'}>
            <VStack justifyContent={'stretch'} alignItems={'stretch'} gap={0} flex={1} px={1}>
              <HStack gap={1} flex={1} justifyContent={'space-between'} alignItems={'center'} minH={10} fontWeight={'medium'}>
                Extractions de données
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
