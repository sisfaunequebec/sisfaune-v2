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

import TextDisplay from '@/app/lib/components/display/base/text'
import CoordinatesDisplay from './coordinates-display'

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


const LocalityDisplay = ({ value }) => {
  const { name, province } = value
  const address = [name, province].filter(Boolean).join(', ')
  return (
    <TextDisplay value={address} />
  )
}

const AddressDisplay = ({ value }) => {
  return (
    <TextDisplay value={value} />
  )
}

const coordinatesSchema = [
  { 
    title: null,
    fields: [
      { label: 'Latitude, longitude\u00A0:', name: 'coordinates', component: CoordinatesDisplay },
      { label: 'Adresse (dérivée)\u00A0:', name: 'description', component: AddressDisplay }
    ]
  }
]

const addressSchema = [
  { 
    title: null,
    fields: [

      { label: 'Adresse\u00A0:', name: 'description', component: AddressDisplay },
      { label: 'Latitude, longitude (dérivées)\u00A0:', name: 'coordinates', component: CoordinatesDisplay },
    ]
  }
]

const LocalisationSection = ({ event, canEdit = false }) => {
 
  const { location } = event
  const { coordinates, type, locality, description  } = location

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
