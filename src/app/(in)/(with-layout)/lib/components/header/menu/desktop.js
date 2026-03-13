'use client'
import { useCallback } from 'react'

import { useRouter, usePathname, useSelectedLayoutSegment } from 'next/navigation'

import { signOut } from 'next-auth/react'
import useTasks from '@/lib/data/tasks/use-tasks.js'

import { Box, Flex, VStack, Button, Menu, IconButton, Status } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(49, 130, 206, 0.7);
  }
  70% {
    box-shadow: 0 0 5px 10px rgba(49, 130, 206, 0);
  }
  100% {
    box-shadow: 0 0 0 0px rgba(49, 130, 206, 0);
  }
`;

import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup
} from '@/app/lib/components/ui/menu.jsx'

import { RxExit, RxGear, RxHamburgerMenu, RxDownload  } from 'react-icons/rx'

import useDialog from '@/utils/use-dialog.js'

import AccountParametersDialog from '../../../containers/account-parameters-dialog.js/index.js'

const TasksIndicator = ({ tasks, size = 'md', ...rest}) => {
  const hasUnseenTasks = tasks?.filter(t => t.wasSeen === false).length > 0
  const hasPendingTasks = tasks?.filter(t => t.status === 'en_cours').length > 0

  const color = hasPendingTasks ? 'orange' : 'blue'

  if (!hasUnseenTasks) {
    return null
  }

  return (
    <Status.Root colorPalette={color} size={size} {...rest} >
      <Status.Indicator /* animation={`${pulse} 2s infinite`} */ />
    </Status.Root>
  )
}

const DesktopMenu = ({ account, onOpenExportManager }) => {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const { data: tasks, isLoading: isLoadingTasks } = useTasks()
  const hasTasks = tasks?.length > 0

  const { ask: openParameters, dialog: parametersDialog } = useDialog(AccountParametersDialog)

  const handleModifyParameters = useCallback(async () => {
    await openParameters({ account })
  }, [openParameters, account])

  const handleMenuRadioItemGroupChange = useCallback(e => {
    const { value } = e
    const targetUrl = value === 'donnees' ? '/donnees/evenements' : '/administration/utilisateurs'
    router.push(targetUrl)
  }, [router])

  const { fullName, email, isAdmin } = account ?? {}

  return (
    <>
      {parametersDialog}
      <Flex hideBelow='md'>
        <Menu.Root positioning={{ placement: 'bottom-end' }} size={'md'} lazyMount >
          <Menu.Trigger as={IconButton} colorPalette='green' variant='subtle' rounded='full' size={['md', null, 'sm']}>
            <TasksIndicator tasks={tasks} size={'lg'} position={'absolute'} bottom={-0.5} right={-0.5} />
            <RxHamburgerMenu />
          </Menu.Trigger>
          <MenuContent minW={60} hideBelow='md' mt={4} isolation='isolate' isolate='isolate' zIndex={1001} _hover={{ bg: 'white' }}>
            <Menu.Item cursor='default' value='info' _hover={{ bg: 'white' }}>
              <VStack gap={0} flex={1} alignItems='flex-start'>
                <Box flex={1} fontWeight={500}>{fullName}</Box>
                <Box flex={1} color='gray.500'>{email}</Box>
              </VStack>
            </Menu.Item>
            <Menu.Separator />
            <MenuRadioItemGroup value={segment} onValueChange={handleMenuRadioItemGroupChange}>
              <MenuRadioItem value='donnees'>Base de données</MenuRadioItem>
              <MenuRadioItem value='administration' disabled={!isAdmin}>Administration</MenuRadioItem>
            </MenuRadioItemGroup>
            <Menu.Separator />
            <Menu.Item onClick={handleModifyParameters} value='params'>
              <RxGear />
              <Box flex={1} ms={0.5}>Vos paramètres...</Box>
            </Menu.Item>
            {/* <Menu.Item value='extractions' onClick={onOpenExportManager} disabled={!hasTasks}>
              <RxDownload />
              <Box flex={1} ms={0.5}>Vos extractions de données...</Box>
              <TasksIndicator tasks={tasks} ms={2} />
            </Menu.Item> */}
            <Menu.Separator />
            <Menu.Item onClick={() => { signOut() }} value='signout'>
              <RxExit />
              <Box flex={1} ms={0.5}>Quitter...</Box>
            </Menu.Item>
          </MenuContent>
        </Menu.Root>
      </Flex>

    </>
  )
}

export default DesktopMenu
