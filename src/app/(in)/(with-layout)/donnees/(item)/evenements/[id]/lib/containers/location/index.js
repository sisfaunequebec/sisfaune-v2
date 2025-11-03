import { useCallback } from 'react'
import { useToggle, useMeasure } from '@uidotdev/usehooks'

import {
  StaticGoogleMap,
  Marker,
  Path
} from 'react-static-google-map'

import { Box, Flex, AbsoluteCenter, IconButton, Stack, HStack, Separator, Fieldset, Button, VStack } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import ResponsiveButton from '@/app/lib/components/responsive-button'
import CenteredMessage from '@/app/lib/components/centered-message'

import EditLocationButton from './edit-location-button'

import TextField from '../../components/text-field'

const StaticMap = ({ lat = 45, lng = -72, zoom }) => {
  const [ref, { width, height }] = useMeasure()

  const mapSize = [Math.round(width), Math.round(height)].join('x')
  const mapCenter = [lat, lng].join(', ')

  return (
    <Flex w='100%' bg='gray.200' aspectRatio='3/2.3' ref={ref}>
      <StaticGoogleMap size={mapSize} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} center={mapCenter} zoom={zoom}>
        <Marker location={mapCenter} />
      </StaticGoogleMap>
    </Flex>
  )
}

const MapField = ( { location  }) => {
  const { latitude, longitude } = location
  // const lat = 45
  // const lng = -72
  return (
    <Stack direction={['column', 'row']} gap={4}>
      <StaticMap zoom={8} lat={latitude} lng={longitude} />
      <StaticMap zoom={12} lat={latitude} lng={longitude} />
      <StaticMap zoom={16} lat={latitude} lng={longitude} />
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
      <TextField label={'Latitude, longitude :'} value={coordinates} />
      <TextField label={'(adresse dérivée) :'} value={address} />
    </>
  )
}

const AddressLocation = ({ location }) => {
  const { latitude, longitude } = location
  const coordinates = [latitude.toFixed(6), longitude.toFixed(6)].join(', ')
  return (
    <>
      <TextField label={'Adresse :'} value={null} />
      <TextField label={'(coordonnées dérivées) :'} value={coordinates} />
    </>
  )
}

const LocalisationSectionForm = ({ event, isEditing, onToggleEditing }) => {
  const { location } = event
  const { latitude, longitude, typeId } = location

  const hasLocation = !!latitude && !!longitude
  const isCoordinateBased = typeId === 'coordonnees'

  return (
    <Fieldset.Root as={'VStack'} alignItems={'stretch'} size={['lg', null, 'md']}>

    { hasLocation ? 
      <>
        <Fieldset.Content gap={0.5} mt={2}>
          { isCoordinateBased ? <CoordinatesLocation location={location}/> :  <AddressLocation location={location} /> }
        </Fieldset.Content>
        <Separator />
        <Fieldset.Content gap={0.5} mt={4}>
          <MapField location={location} />
        </Fieldset.Content>
      </>
    : 
      <CenteredMessage title={'Localisation indéterminée'} size={'sm'} />
    } 

    </Fieldset.Root>
  )
}

const LocalisationSection = ({ event, canEdit = false }) => {
  const isEditing = true
  // const { location } = event

  // const handleToggleEditing = useCallback(() => {
  //   onToggleEditing('localisation')
  // }, [onToggleEditing])

  return (
    <AccordionItem value={'location'} position={'sticky'} zIndex={1000}>
      <Box position={'sticky'} top={[181, null, 176]} zIndex={1000} h={'46px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <EditLocationButton event={event} /> }
        </AbsoluteCenter>
        <Trigger label={'Localisation géographique'} h={'46px'} />
      </Box>
      <Content>
        <LocalisationSectionForm event={event} />
      </Content>
    </AccordionItem>
  )
}

export default LocalisationSection
