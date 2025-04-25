
import getUser from '@/lib/auth/get-user'
import { canUserExport, canUserSubmitEvent } from '@/lib/auth/acl'

import { HStack } from '@chakra-ui/react'

import ToolbarWrapper from '@/app/lib/components/toolbar-wrapper'

import EvenementsSpecimens from '../../components/evenements-specimens-tabs'

import NewEventButton from './new-event-button'
import ExportButton from './export-button'

const Toolbar = async () => {
  const user = await getUser()

  const canSubmitEvent = canUserSubmitEvent(user)
  const canExport = canUserExport(user)

  return (
    <ToolbarWrapper>
      <HStack justifyContent={'space-between'} gap={2}>
        <HStack justifyContent={'space-between'} gap={2}>
          <EvenementsSpecimens />
        </HStack>
        <HStack justifyContent={'space-between'} gap={2}>
          { canExport && <ExportButton /> }
          { canSubmitEvent && <NewEventButton /> }
        </HStack>
      </HStack>
    </ToolbarWrapper>
  )
}

export default Toolbar
