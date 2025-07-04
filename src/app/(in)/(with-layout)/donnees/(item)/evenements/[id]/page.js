import getUser from '@/lib/auth/get-user'
import { getEvent } from '@/lib/data/events/service'

import NextLink from 'next/link'

import { AbsoluteCenter, Button, Container } from '@chakra-ui/react'

import { userCanViewEventSection, userCanAddAnalysis, userCanAddSpecimen, userCanDeleteAnalysis, userCanDeleteSpecimen, userCanEditSpecimenSection, userCanEditAnalysisSection, canUserDeleteEvent } from '@/lib/auth/acl'

import Event from './lib/containers/event'
import CenteredMessage from '@/app/lib/components/centered-message'
// import PageSpinner from '@/app/lib/components/page-spinner'

// import Toolbar from '../../../(list)/evenements/lib/components/toolbar'

// import DeleteEventButton from './lib/components/delete-event-button'

// import AddSpecimenDialog from '../../../(list)/lib/containers/add-specimen-dialog'
// import AddAnalysisDialog from './lib/containers/add-analysis-dialog'

// // import AjouterAnalyseDialog from './lib/components/ajouter-analyse-dialog'
// import DetruireAnalyseDialog from './lib/components/detruire-analyse-dialog'
// import DetruireSpecimenDialog from './lib/components/detuire-specimen-dialog'

// import InfosGeneralesSection from './lib/containers/infogenerales'
// import LaboratoireSection from './lib/containers/laboratoire'
// import LocalisationSection from './lib/containers/localisation'

// import SpecimenInformationSection from './lib/containers/specimen'

const UnauthorizedOrNotFound = () => {
  return (
    <CenteredMessage level={'warning'} title={'Désolé !'} description={'Cet événement est introuvable ou vous n\'êtes pas autorisé à le consulter'}>
      <Button as={NextLink} size={['lg', null, 'md']} href={'/donnees'} variant={'surface'} colorPalette={'green'}>Revenir à la base de données</Button>
    </CenteredMessage>
  )
}

// const SectionHeading = ({ label, isSticky = false, children }) => {
//   return (
//     <Flex as='section' bg='green.100' color='green.600' px={5} py={3} fontWeight={500} borderColor='green.300' borderTopWidth={1} alignItems='center' justifyContent='space-between' position={isSticky && 'sticky'} top={[135, null, 130]} justifySelf='flex-start' zIndex={1000}>
//       <Text as='h3' userSelect='none'>{label}</Text>
//       {children}
//     </Flex>
//   )
// }

export async function generateMetadata({ params }) {
  const { id } = await params
  // const eventId = parseInt(id, 10)
  // console.debug(eventId)

  // const user = await getUser()
  // const event = await getEvent(eventId, { user })

  // if (!event) {
  //   return 
  // }

  return {
    title: `Événement no ${id} | SIS Faune` 
  }
}

const Evenement = async ({ params }) => {
  const { id } = await params

  const eventId = parseInt(id, 10)

  const user = await getUser()
  const event = await getEvent(eventId, { user })

  // console.debug(event, user)

  if (!event) {
   return (
      <AbsoluteCenter as={Container}>
        <UnauthorizedOrNotFound />
      </AbsoluteCenter>
    )
  }

  const { programId } = event

  const canViewEvent = userCanViewEventSection(user, programId)

  if (!canViewEvent) {
   return (
      <AbsoluteCenter as={Container}>
        <UnauthorizedOrNotFound />
      </AbsoluteCenter>
    )
  }

  const canDeleteEvent = canUserDeleteEvent(user) 

  const canUserAddSpecimen = userCanAddSpecimen(user, programId) 
  const canUserDeleteSpecimens = userCanDeleteSpecimen(user, programId) 
  const canUserEditSpecimens = userCanEditSpecimenSection(user, programId) 

  const canUserAddAnalysis = userCanAddAnalysis(user, programId) 
  const canUserDeleteAnalyses = userCanDeleteAnalysis(user, programId) 
  const canUserEditAnalyses  = userCanEditAnalysisSection(user, programId) 

  // console.debug('canUserAddSpecimen', canUserAddSpecimen)

  // const [event, setEvent] = useState(undefined)
  // const [activePanel, setActivePanel] = useState(['general'])

  // const [editingSection, setEditingSection] = useState(null)

  // const handleToggleEditingSection = useCallback(section => {
  //   // console.debug(editingSection, section)
  //   if (editingSection) {
  //     if (editingSection === section) {
  //       // setActivePanel([section])
  //       setEditingSection(null)
  //     } else {

  //     }
  //   } else {
  //     setActivePanel([section])
  //     setEditingSection(section)
  //   }
  // }, [editingSection])

  // const handleToggleActiveSection = useCallback(e => {
  //   setActivePanel(e.value)
  // }, [])

  // const dialogs = []

  // // const { ask: deleteEvent, dialog: deleteEventDialog } = useDialog(DetruireEvenementDialog)
  // // dialogs.push(deleteEventDialog)

  // // const handleDeleteEvent = useCallback(async () => {
  // //   const result = await deleteEvent({ eventId: idEvenement })
  // //   if (result) {
  // //     console.debug('Delete !!!')
  // //   }
  // //   // console.log(result)
  // // }, [idEvenement, deleteEvent])

  // useEffect(() => {
  //   const loadEvent = async (eventId) => {
  //     const user = await getUser()
  //     const event = await getEvent(eventId, { user })
  //     console.debug('loadEvent', event)
  //     setEvent(event)
  //   }
  //   loadEvent(eventId)
  // }, [eventId])

  // const { ask: createSpecimen, dialog: createSpecimenDialog } = useDialog(AddSpecimenDialog)
  // dialogs.push(createSpecimenDialog)

  // const handleCreateSpecimen = useCallback(async () => {
  //   const result = await createSpecimen()
  //   if (result) {
  //     console.debug('Create !!!')
  //   }
  // }, [createSpecimen])

  // const { ask: createAnalysis, dialog: createAnalysisDialog } = useDialog(AddAnalysisDialog)
  // dialogs.push(createAnalysisDialog)

  // const handleCreateAnalysis = useCallback(async () => {
  //   const result = await createAnalysis()
  //   if (result) {
  //     console.debug('Create !!!')
  //   }
  // }, [createAnalysis])

  // const { ask: deleteAnalysis, dialog: deleteAnalysisDialog } = useDialog(DetruireAnalyseDialog)
  // dialogs.push(deleteAnalysisDialog)

  // const handleDeleteAnalysis = useCallback(async () => {
  //   const result = await deleteAnalysis()
  //   if (result) {
  //     console.debug('Delete !!!')
  //   }
  // }, [deleteAnalysis])

  // const { ask: deleteSpecimen, dialog: deleteSpecimenDialog } = useDialog(DetruireSpecimenDialog)
  // dialogs.push(deleteSpecimenDialog)

  // const handleDeleteSpecimen = useCallback(async () => {
  //   const result = await deleteSpecimen()
  //   if (result) {
  //     console.debug('Delete !!!')
  //   }
  // }, [deleteSpecimen])

  // if (event === undefined) {
  //   return (
  //     <PageSpinner />
  //   )
  // }

  // if (event === null) {
  //   return (
  //     <AbsoluteCenter as={Container}>
  //       <UnauthorizedOrNotFound />
  //     </AbsoluteCenter>
  //   )
  // }

  // // const { specimens } = event

  return (
    <Event 
      event={event}
      canDeleteEvent={canDeleteEvent}
      canUserAddSpecimen={canUserAddSpecimen}
      canUserDeleteSpecimens={canUserDeleteSpecimens}
      canUserEditSpecimens={canUserEditSpecimens}
      canUserAddAnalysis={canUserAddAnalysis}
      canUserDeleteAnalyses={canUserDeleteAnalyses}
      canUserEditAnalyses={canUserEditAnalyses}
    />
  )
}

export default Evenement
