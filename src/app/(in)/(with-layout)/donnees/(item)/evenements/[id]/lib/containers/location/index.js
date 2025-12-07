import { Component, useCallback } from 'react'
import { useToggle, useMeasure } from '@uidotdev/usehooks'

import {
  StaticGoogleMap,
  Marker
} from 'react-static-google-map'

import { Box, Flex, AbsoluteCenter, IconButton, Stack, HStack, Separator, Fieldset, Button, VStack } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'
import Fields from '@/app/lib/components/display/fields'

import CenteredMessage from '@/app/lib/components/centered-message'

import EditLocationButton from './edit-location-button'

import TextInput from '@/app/lib/components/inputs/base/text'
import TextDisplay from '@/app/lib/components/display/base/text'

const StaticMap = ({ lat = 45, lng = -72, zoom }) => {
  const [ref, { width, height }] = useMeasure()

  const mapSize = [Math.round(width), Math.round(height)].join('x')
  const mapCenter = [lat, lng].join(', ')

  return (
    <Flex w='100%' bg='gray.200' aspectRatio='4/3' ref={ref}>
      <StaticGoogleMap size={mapSize} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} center={mapCenter} zoom={zoom}>
        <Marker location={mapCenter} />
      </StaticGoogleMap>
    </Flex>
  )
}

const MapDisplay = ({ coordinates }) => {
  const { latitude, longitude } = coordinates
  return (
    <Stack direction={['column', 'row']} gap={4}>
      <StaticMap zoom={12} lat={latitude} lng={longitude} />
      <StaticMap zoom={14} lat={latitude} lng={longitude} />
      <StaticMap zoom={17} lat={latitude} lng={longitude} />
    </Stack>
  )
}

const CoordinatesLocation = ({ location }) => {
  const { latitude, longitude, locality } = location
  const { name, province } = locality
  const coordinates = [latitude.toFixed(6), longitude.toFixed(6)].join(', ')
  const address = [name, province].join(', ')
  return (
    <>
      <TextInput label={'Latitude, longitude :'} value={coordinates} />
      <TextInput label={'(adresse dérivée) :'} value={address} />
    </>
  )
}

const AddressLocation = ({ marker }) => {
  const { latitude, longitude } = location
  const coordinates = [latitude.toFixed(6), longitude.toFixed(6)].join(', ')
  return (
    <>
      <TextInput label={'Adresse :'} value={null} />
      <TextInput label={'(coordonnées dérivées) :'} value={coordinates} />
    </>
  )
}

// const LocalisationSectionForm = ({ event }) => {
//   const { location } = event
//   const { latitude, longitude, type } = location

//   const hasLocation = !!latitude && !!longitude
//   const isCoordinateBased = type?.id === 'coordonnees'

//   console.debug('LocalisationSectionForm', event, type)

//   return (
//     <Fieldset.Root as={'VStack'} alignItems={'stretch'} size={['lg', null, 'md']}>

//     { hasLocation ? 
//       <>
//         <Fieldset.Content gap={0.5} mt={2}>
//           { isCoordinateBased ? <CoordinatesLocation location={location}/> :  <AddressLocation location={location} /> }
//         </Fieldset.Content>
//         <Separator />
//         <Fieldset.Content gap={0.5} mt={4}>
//           <MapField location={location} />
//         </Fieldset.Content>
//       </>
//     : 
//       <CenteredMessage title={'Localisation indéterminée'} size={'sm'} />
//     } 

//     </Fieldset.Root>
//   )
// }

const CoordinatesDisplay = ({ value }) => {
  const { latitude, longitude } = value
  const coordinates = [latitude.toFixed(6), longitude.toFixed(6)].join(', ')
  return (
    <TextDisplay value={coordinates} />
  )
}

const AddressDisplay = ({ value }) => {
  const { name, province } = value
  const address = [name, province].join(', ')
  return (
    <TextDisplay value={address} />
  )
}

const coordinatesSchema = [
  { 
    title: null,
    fields: [
      { label: 'Latitude, longitude\u00A0:', name: 'coordinates', component: CoordinatesDisplay },
      { label: 'Adresse à proximité\u00A0:', name: 'locality', component: AddressDisplay },
      // { label: 'Spécimen(s) reçu(s) le\u00A0:', name: 'labReceivedAt', component: DateDisplay },
      // { label: null, name: 'position', component: MapField }
    ]
  }
]

const addressSchema = [
  { 
    title: null,
    fields: [
      // { label: 'Responsable du dossier\u00A0:', name: 'labResponsible', component: LabResponsibleDisplay },
      // { label: 'Spécimen(s) reçu(s) le\u00A0:', name: 'labReceivedAt', component: DateDisplay },
      // { label: null, name: 'position', component: MapField }
    ]
  }
]

const LocalisationSection = ({ event, canEdit = false }) => {
  console.debug(event)

  const { location } = event
  const { coordinates, type } = location
  
  const hasLocation = !!coordinates
  const schema = type?.id === 'coordonnees' ? coordinatesSchema : addressSchema

  return (
    <AccordionItem value={'location'} position={'sticky'} zIndex={1000}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={1000} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditLocationButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label={'Localisation géographique'} h={'46px'} />
      </Box>
      <Content>
        <>
          { hasLocation ? 
            <>
              <Fields schema={schema} data={location} mb={2} />
              <MapDisplay coordinates={coordinates} />
            </>
          : 
            <CenteredMessage title={'Localisation indéterminée'} size={'sm'} /> 
          }
        </>
      </Content>
    </AccordionItem>
  )
}

export default LocalisationSection
