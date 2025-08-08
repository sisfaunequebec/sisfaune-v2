import { useCallback } from 'react'
import { useToggle, useMeasure } from '@uidotdev/usehooks'

import {
  StaticGoogleMap,
  Marker,
  Path
} from 'react-static-google-map'

import { Box, Flex, AbsoluteCenter, IconButton, Stack, HStack, Separator, Fieldset, Button } from '@chakra-ui/react'
import { RxPencil1 } from 'react-icons/rx'

import {
  AccordionItem
} from '@/app/lib/components/ui/accordion'

import { Trigger, Content } from '../../components/accordion-parts'

import ResponsiveButton from '@/app/lib/components/responsive-button'

const StaticMap = ({ lat = 45, lng = -72, zoom }) => {
  const [ref, { width, height }] = useMeasure()

  const mapSize = [Math.round(width), Math.round(height)].join('x')
  const mapCenter = [lat, lng].join(', ')

  return (
    <Flex w='100%' bg='gray.200' aspectRatio='3/2.3' ref={ref}>
      <StaticGoogleMap size={mapSize} apiKey='AIzaSyDIb9gr86ch2p6T5ULbVqwuBmc80S683Uk' center={mapCenter} zoom={zoom}>
        <Marker location={mapCenter} />
      </StaticGoogleMap>
    </Flex>
  )
}

const MapField = () => {
  const lat = 45
  const lng = -72
  return (
    <Stack direction={['column', 'row']} gap={4}>
      <StaticMap zoom={8} lat={lat} lng={lng} />
      <StaticMap zoom={12} lat={lat} lng={lng} />
      <StaticMap zoom={16} lat={lat} lng={lng} />
    </Stack>
  )
}

const LocalisationSectionForm = ({ event, isEditing, onToggleEditing }) => {
  return (
    <Fieldset.Root as='VStack' alignItems='stretch' size={['lg', null, 'md']}>

      {/* <Fieldset.Legend>Personnes impliquées</Fieldset.Legend> */}
      <Fieldset.Content gap={0.5} mt={2}>
        {/* <MapField /> */}
      </Fieldset.Content>

      <Separator />

      {/* <Fieldset.Legend>Personnes impliquées</Fieldset.Legend> */}
      <Fieldset.Content gap={0.5} mt={2}>
        <MapField />
      </Fieldset.Content>

    </Fieldset.Root>
  )
}

const LocalisationSection = ({ event, canEdit = false }) => {
  const isEditing = false

  // const handleToggleEditing = useCallback(() => {
  //   onToggleEditing('localisation')
  // }, [onToggleEditing])

  return (
    <AccordionItem value={'location'} position={isEditing ? 'sticky' : 'static'} zIndex={isEditing && 1000} disabled={isEditing}>
      <Box position={isEditing ? 'sticky' : 'relative'} top={isEditing && [135, null, 130]} zIndex={isEditing && 1000} minH={'48px'}>
        <AbsoluteCenter as={HStack} axis={'vertical'} insetEnd={2}>
          { canEdit && <ResponsiveButton colorPalette={'green'} variant={'subtle'} size={'sm'} label={'Modifier'} icon={<RxPencil1 />} me={[2, null, 1]} /> }
        </AbsoluteCenter>
        <Trigger label={'Localisation géographique'} />
      </Box>
      <Content>
        <LocalisationSectionForm />
      </Content>
    </AccordionItem>
  )
}

export default LocalisationSection
