import getUser from '@/lib/auth/get-user'
import { getEvent } from '@/lib/data/events/service'

import NextLink from 'next/link'

import { Flex, AbsoluteCenter, Button, Container } from '@chakra-ui/react'

import { userCanViewEventSection, userCanEditEventSection, userCanAddAnalysis, userCanAddSpecimen, userCanDeleteAnalysis, userCanDeleteSpecimen, userCanEditSpecimenSection, userCanEditAnalysisSection, canUserDeleteEvent } from '@/lib/auth/acl'

import Toolbar from './lib/components/toolbar.js'

import Event from './lib/containers/event/index.js'
import CenteredMessage from '@/app/lib/components/centered-message'
import SidebarContainer from '@/app/(in)/(with-layout)/lib/components/sidebar-container.js'
import ContentContainer from '@/app/(in)/(with-layout)/lib/components/content-container.js'

const UnauthorizedOrNotFound = () => {
  return (
    <CenteredMessage level={'warning'} title={'Désolé'} description={'Cet événement est introuvable ou vous n\'êtes pas autorisé à le consulter'}>
      <Button as={NextLink} size={['lg', null, 'md']} href={'/donnees'} variant={'surface'} colorPalette={'green'}>Revenir à la base de données</Button>
    </CenteredMessage>
  )
}

export async function generateMetadata({ params }) {
  const { id } = await params

  return {
    title: `Événement no ${id} | SIS Faune` 
  }
}

const Evenement = async ({ params }) => {
  const { id } = await params

  const eventId = parseInt(id, 10)

  const user = await getUser()
  const event = await getEvent(eventId, { user })

  if (!event) {
   return (
      <AbsoluteCenter as={Container}>
        <UnauthorizedOrNotFound />
      </AbsoluteCenter>
    )
  }

  const { program } = event
  const { id: programId } = program

  const canViewEvent = userCanViewEventSection(user, programId)

  if (!canViewEvent) {
   return (
      <AbsoluteCenter as={Container}>
        <UnauthorizedOrNotFound />
      </AbsoluteCenter>
    )
  }

  const canUserEditEventSection = userCanEditEventSection(user, programId) 

  const canDeleteEvent = canUserDeleteEvent(user) 

  const canUserAddSpecimen = userCanAddSpecimen(user, programId) 
  const canUserDeleteSpecimens = userCanDeleteSpecimen(user, programId) 
  const canUserEditSpecimens = userCanEditSpecimenSection(user, programId) 

  const canUserAddAnalysis = userCanAddAnalysis(user, programId) 
  const canUserDeleteAnalyses = userCanDeleteAnalysis(user, programId) 
  const canUserEditAnalyses  = userCanEditAnalysisSection(user, programId) 

  return (
    <>
      <Toolbar canDeleteEvent={canDeleteEvent} />
      <Flex flex={1} top={0} as={Container} direction={['column', null, 'row']} maxWidth={['6xl']} fontSize={['md', null, 'sm']} zIndex={999}>
        <SidebarContainer/>
        <ContentContainer direction={'column'}>
          <Event 
            event={event}
            canUserEditEventSection={canUserEditEventSection}
            canDeleteEvent={canDeleteEvent}
            canUserAddSpecimen={canUserAddSpecimen}
            canUserDeleteSpecimens={canUserDeleteSpecimens}
            canUserEditSpecimens={canUserEditSpecimens}
            canUserAddAnalysis={canUserAddAnalysis}
            canUserDeleteAnalyses={canUserDeleteAnalyses}
            canUserEditAnalyses={canUserEditAnalyses}
          />
        </ContentContainer>
      </Flex>
    </>
  )
}

export default Evenement
