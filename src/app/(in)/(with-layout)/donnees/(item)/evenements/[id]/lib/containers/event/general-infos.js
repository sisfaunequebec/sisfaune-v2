import { Box, Flex, AbsoluteCenter, VStack, HStack, Separator, Fieldset, Field as ChakraField } from '@chakra-ui/react'

import { numericFormatter } from 'react-number-format'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import Fields from '@/app/lib/components/display/fields'

import TextDisplay from '@/app/lib/components/display/base/text'
import SelectDisplay from '@/app/lib/components/display/base/select'
import NumberDisplay from '@/app/lib/components/display/base/number'
import DateDisplay from '@/app/lib/components/display/base/date'
import CommentDisplay from '@/app/lib/components/display/base/comment'

import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'

import EditGeneralInfosButton from './edit-general-infos-button'

const Cell = ({ bg, text, ...rest }) => {
  return (
    <Flex flex={1} bg={bg} borderRadius={'md'} px={3} py={3} lineHeight={'1.1rem'} {...rest}>
      { !!text ? text : '\u00A0' }
    </Flex>
  )
}

const TitleCell = (props) => {
  return (
    <Cell fontWeight={'medium'} py={0} fontSize={'0.8rem'} {...props} />
  )
}

const AffectedSpeciesDisplay = ({ value: affectedSpecies = [] }) => {
  return (
    <VStack spacing={1} flex={1}>
      <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
        <Flex direction={'row'} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} ></Flex>
          <HStack flex={2} w={'full'} direction={'column'}>
            <TitleCell text={'Vivants'} />
            <TitleCell text={'Malades'} />
            <TitleCell text={'Morts'} />
            <TitleCell text={'N/A'} />
          </HStack>
        </Flex>
        { affectedSpecies.map(specie => {
          const { index, specieName, aliveCount, unhealthyCount, deadCount, notSpecifiedCount } = specie
          return (
            <ChakraField.Root key={index} justifyContent={'stretch'}>
              <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
                <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
                  {specieName} :
                </ChakraField.Label>
                <HStack flex={2} w={'full'} direction={'column'}>
                  <Cell bg={'gray.100'} text={aliveCount}/>
                  <Cell bg={'gray.100'} text={unhealthyCount}/>
                  <Cell bg={'gray.100'} text={deadCount}/>
                  <Cell bg={'gray.100'} text={notSpecifiedCount}/>
                </HStack>
              </Flex>
            </ChakraField.Root>
          )
        })}
    </VStack>
  )
}

// const AffectedSpeciesDisplay = ({ value = [] }) => {
//   if (value.length === 0) {
//     return (
//       <TextDisplay value={'Aucune espèce affectée'} />
//     )
//   }

//   return (
//     <VStack spacing={1} flex={1} bg={'gray.100'} borderRadius={'md'} px={3} py={2} lineHeight={'1.1rem'}>
//       <HStack justifyContent={'stretch'} w={'100%'} fontWeight={'medium'}>
//         <Flex flex={4}>Espèce</Flex>
//         <Flex flex={1} justifyContent={'center'}>Sains</Flex>
//         <Flex flex={1} justifyContent={'center'}>Malades</Flex>
//         <Flex flex={1} justifyContent={'center'}>Morts</Flex>
//         <Flex flex={1} justifyContent={'center'}>N/S</Flex>
//       </HStack>
//       {value.map((item, index) => {
//         const { specieName, specieBinome, aliveCount, unhealthyCount, deadCount, notSpecifiedCount } = item
//         return (
//           <HStack key={index} justifyContent={'stretch'} w={'100%'}>
//             <Flex flex={4}>{specieName}</Flex>
//             <Flex flex={1} justifyContent={'center'}>{aliveCount || 0}</Flex>
//             <Flex flex={1} justifyContent={'center'}>{unhealthyCount || 0}</Flex>
//             <Flex flex={1} justifyContent={'center'}>{deadCount || 0}</Flex>
//             <Flex flex={1} justifyContent={'center'}>{notSpecifiedCount || 0}</Flex>
//           </HStack>
//         )
//       })}
//     </VStack>
//   )

// }

const DiscovererDisplay = ({ value, data }) => {
  const { status: eventStatus, isDiscovererSameAsSubmitter } = data || {}
  const { id: statusId } = eventStatus || {}

  const isEventClosed = statusId === 3

  if (isEventClosed) {
    return (
     <CommentDisplay value={'L\'événement est terminé : les informations sur le découvreur ne sont plus disponibles.'} />
    )
  } else if (isDiscovererSameAsSubmitter) {
    return (
     <TextDisplay value={'Le soumissionnaire'} />
    )
  } else {

    let text = null
      
    if (value) {
      const {
        firstName, lastName,
        title,
        organisation,
        division,
        service,
        streetNumber, street,
        locality = {},
        postalCode,
        telephone, extension,
        email: emailRaw
      } = value

      // const localityName = locality?.name
      const { name: localityName, province } = locality || {}

      const fullName = [firstName, lastName].join(' ')
      const address = (streetNumber || localityName) ? [streetNumber, street].filter(Boolean).join(', ') : null
      const city =  [localityName, province].filter(Boolean).join(', ')
      const phone = telephone ? `Téléphone : ${[telephone, extension].filter(Boolean).join(' #')}` : null
      const email = emailRaw ? `Courriel : ${[emailRaw].join(' ')}` : null
      
      // const phoneOrEmail = !!phone || !!email
      // console.debug(phoneOrEmail)

      text = [fullName, title, organisation, division, service, address, city, postalCode, phone, email].filter(Boolean).join('\r')
    }

    return (
      <CommentDisplay value={text} />
    )
  }
}

const ContactDisplay = ({ value }) => {
  const message = value ? 'Oui' : 'Non'
  return (
    <TextDisplay value={message} />
  )
}

const CollaboratorDisplay = ({ value }) => {
  let text = null
  
  if (value) {
    const {
      firstName, lastName,
      title,
      organisation,
      division,
      service,
      streetNumber, street,
      localityName, province,
      postalCode,
      telephone, extension,
      email: emailRaw
    } = value

    const fullName = [firstName, lastName].join(' ')
    const address = (streetNumber || localityName) ? [streetNumber, street].filter(Boolean).join(', ') : null
    const city =  [localityName, province].filter(Boolean).join(', ')
    const phone = telephone ? `Téléphone : ${[telephone, extension].filter(Boolean).join(' #')}` : null
    const email = emailRaw ? `Courriel : ${[emailRaw].join(' ')}` : null

    text = [fullName, title, organisation, division, service, address, city, postalCode, phone, email].filter(Boolean).join('\r')
  }

  return (
    <CommentDisplay value={text} />
  )
}

const schema = [
  { 
    title: 'Identification',
    fields: [
      { label: 'Numéro d\'événement\u00A0:', name: 'id' },
      { label: 'Type d\'événement\u00A0:', name: 'type', component: SelectDisplay },
      { label: 'Numéro d\'identification SILAB\u00A0:', name: 'silabId' },
      { label: 'Numéro d\'incident CQSAS\u00A0:', name: 'cqsasIncidentNumber' },
      { label: 'Numéro de pathologie\u00A0:', name: 'pathologyNumber' },
      { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateDisplay },
      { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      { label: 'Programme\u00A0:', name: 'program', component: SelectDisplay  },
      { label: 'Provenance du signalement\u00A0:', name: 'reportOrigin', component: SelectDisplay  },
      { label: 'Statut\u00A0:', name: 'status', component: SelectDisplay  },
      { label: 'Date de fermeture du dossier\u00A0:', component: DateDisplay, name: 'closedAt', visible: (data) => { const { status, closedAt } = data; const {id: statusId } = status; return (statusId === 3 && closedAt) } },
    ]
  },
  { 
    title: 'Personnes impliquées',
    fields: [
      { label: 'Soumis par\u00A0:', name: 'submitter', component: CollaboratorDisplay },
      { label: 'Découvert par\u00A0:', name: 'discoverer', component: DiscovererDisplay },
      { label: 'Récolté par (contractuel)\u00A0:', name: 'collaborator' , component: SelectDisplay }
    ]
  },
  { 
    title: 'Description de l\'événement',
    fields: [
      { label: 'Date de la découverte\u00A0:', name: 'discoveredAt', component: DateDisplay },
      { label: 'Date de la récolte\u00A0:', name: 'collectedAt', component: DateDisplay },
      { label: 'Un humain a été en contact\u00A0?', name: 'hadHumanContact' , component: ContactDisplay },
      { label: 'Un animal domestique a été en contact\u00A0?', name: 'hadAnimalContact' , component: ContactDisplay },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatType', component: SelectDisplay },
      { label: 'Température\u00A0:', name: 'temperature', component: NumberDisplay, props: { precision: 1, suffix: '(en celsius)' } },
      { label: 'Observations sur le terrain\u00A0:', name: 'observations', component: CommentDisplay },
      { label: 'Commentaires généraux\u00A0:', name: 'comments', component: CommentDisplay },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentDisplay },
    ]
  },
  {
    title: 'Individus affectés, par espèce',
    visible: (data) => { const { affectedSpecies } = data; return affectedSpecies.length > 0 },
    fields: [
      { label: null, name: 'affectedSpecies', component: AffectedSpeciesDisplay },
    ]
  },
  { 
    title: 'Expédition des spécimens',
    fields: [
      { label: 'Spécimen(s) expédié(s) le\u00A0:', name: 'labShippedAt', component: DateDisplay},
      { label: 'Méthode d\'expédition\u00A0:', name: 'labShippingMethod', component: SelectDisplay },
      { label: 'Numéro de connaissement\u00A0:', name: 'labShippingTrackingNumber'  },
      { label: 'Laboratoire de destination\u00A0:', name: 'lab', component: SelectDisplay }
    ]
  },
]

const GeneralInfosSection = ({ event, canEdit = false }) => {
  return (
    <AccordionItem value={'general'} position={'sticky'} zIndex={1000}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={1000} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditGeneralInfosButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label='Informations générales' h={'46px'} />
      </Box>
      <Content>
        <Fields schema={schema} data={event} />
      </Content>
    </AccordionItem>
  )
}

export default GeneralInfosSection
