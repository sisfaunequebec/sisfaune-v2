'use client'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'

import * as turf from '@turf/turf'

import { Box, Fieldset, HStack, Button, IconButton, VStack, Input, Text } from '@chakra-ui/react'

import { FaMapMarkerAlt } from 'react-icons/fa'

import { useFormContext } from 'react-hook-form'

import { AdvancedMarker, APIProvider, Map, MapControl, Marker, useMap, useMapsLibrary, ControlPosition } from '@vis.gl/react-google-maps'

import BaseDialog from '@/app/lib/components/dialogs/base'
import { Fields } from '@/app/lib/components/dialogs/base'

import TextInput from '@/app/lib/components/inputs/base/text'
import SelectInput from '@/app/lib/components/inputs/base/select'
import NumberInput from '@/app/lib/components/inputs/base/number'

import TextDisplay from '@/app/lib/components/display/base/text'

import CoordinatesDisplay from '../coordinates-display'

import updateLocationAction from '../update-location.action'

const DEFAULT_CENTER = { lat: 46.5, lng: -73.5 }

const LocationTypeSelect = ({ value, onChange, onBlur, contentRef }) => {
  const items = [
    { id: 'coordonnees', name: 'Coordonnées géographiques' },
    { id: 'adresse', name: 'Adresse' }
  ]
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} value={value} onChange={onChange} onBlur={onBlur} contentRef={contentRef} clearable={false}  />
  )
}

const CoordinatesInput = ({ value = {}, onChange, size }) => {
  const { latitude, longitude } = value

  const handleLatitudeChange = useCallback(v => {
    console.debug('handleLatitudeChange', v)
  }, [onChange, longitude])

  const handleLongitudeChange = useCallback(v => {
    console.debug('handleLongitudeChange', v)
  }, [onChange, latitude])

  return (
    <HStack flex={1}>
      <NumberInput value={latitude} placeholder={'Latitude'} precision={6} size={size} onChange={handleLatitudeChange} />
      <NumberInput value={longitude} placeholder={'Longitude'} precision={6} size={size} onChange={handleLongitudeChange} />
    </HStack>
  )
}

{/* const NumberInput = ({ value, onChange, size }) => {
  const [inputValue, setInputValue] = useState(value)
  
  const handleChange = e => {
    const { value } = e.target
    
    if (value === '') {
      setInputValue(value)
      onChange(null)
    }

    if (value === '-') {
      setInputValue(value)
      onChange(null)
    }

    if (decimalRegex.test(value)) {
      setInputValue(value)
      onChange(Number(value))
    }
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Input inputMode={'numeric'} value={inputValue} onChange={handleChange} size={size} />
  )
} */}

const LatLongInput = ({ value, onChange, isEditing = false, contentRef }) => {
  const [internalValue, setInternalValue] = useState(value || { lat: null, lng: null })

  useEffect(() => {
    if (value) {
      const { lat, lng } = value
      setInternalValue({ lat, lng })
    }
  }, [value])

  const handleLatChange = useCallback((lat) => {
    if (!!lat) {
      setInternalValue({ lat, lng: internalValue.lng })
      onChange({ lat, lng: internalValue.lng })
    } else {
      onChange(null)
    }
  }, [onChange, internalValue])

  const handleLngChange = useCallback((lng) => {
    setInternalValue({ lat: internalValue.lat, lng })
    if (!!lng) {      
      onChange({ lat: internalValue.lat, lng })
    } else {
      onChange(null)
    }
  }, [onChange, internalValue])

  if (isEditing) {
    const { lat, lng } = internalValue

    return (
      <HStack gap={2} flex={1} ref={contentRef}>
        <NumberInput value={lat} onChange={handleLatChange} size={'sm'} />
        <NumberInput value={lng} onChange={handleLngChange} size={'sm'} />
      </HStack>
    )
  } else {
      const displayValue = internalValue ? [internalValue.lat?.toFixed(6), internalValue.lng?.toFixed(6)].filter(Boolean).join(', ') : ''
      return (
        <TextInput value={displayValue} isEditing={false} size={'sm'} />
      )
  }
}

const CenterButton = ({ currentPosition, bounds }) => {
  const map = useMap()
 
  const showButton = useMemo(() => {
    if (currentPosition) {
      const { lat, lng } = currentPosition
      if (!!lat && !!lng && map) {

        if (!bounds) {
          return false
        }

        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()

        const pt = turf.point([lng, lat])
        const poly = turf.polygon([
          [
            [ne.lng(), ne.lat()],
            [ne.lng(), sw.lat()],
            [sw.lng(), sw.lat()],
            [sw.lng(), ne.lat()],
            [ne.lng(), ne.lat()],
          ]
        ])

        const inPoly = turf.booleanPointInPolygon(pt, poly)
        return !inPoly
      }
    } else {
      return false
    }
  }, [currentPosition, map, bounds])

  const handleClick = useCallback(e => {
    if (currentPosition) {
      const { lat, lng } = currentPosition
      if (!!lat && !!lng) {
        map.panTo(currentPosition)
      }
    } else {
      map.panTo(DEFAULT_CENTER)
    }
  }, [map, currentPosition])

  useEffect(() => {
    if (currentPosition) {
      const { lat, lng } = currentPosition
      if (!!lat && !!lng) {
        map.panTo(currentPosition)
      }
    } else {
      map.panTo(DEFAULT_CENTER)
    }
  }, [map, currentPosition])

  if (!showButton) {
    return null
  }

  return (
    <Button variant={'solid'} size={'xs'} colorPalette={'green'} ms={2} mt={2} onClick={handleClick}>
      <FaMapMarkerAlt/> Recentrer
    </Button>
  )
}

const LocationMarker = ({ position, isDraggable, onChange }) => {
  const { setValue } = useFormContext()

  const [geocoder, setGeocoder] = useState(null)
  const geocodeLib = useMapsLibrary('geocoding')

  useEffect(() => {
    if (!geocodeLib) return
    const geocoder = new geocodeLib.Geocoder()
    setGeocoder(geocoder)
  }, [geocodeLib])

  const geocode = useCallback(async (position) => {
    if (!geocoder) return

    const response = await geocoder.geocode({ location: position, fulfillOnZeroResults: true })

    const { results } = response
    const result = results.find(r => {
      const { types } = r
      return ['street_address'].some(value => types.includes(value))
    })

    if (result) { return result.formatted_address }
    console.debug(result)

  }, [geocoder])

  useEffect(() => {
    const updateAdress = async (position) => {
      const address = await geocode(position)
      setValue('description', address)
    }
    updateAdress(position)
  }, [position, geocode, setValue])

  const handleChange = useCallback(async (e) => {
    const { latLng } = e
    const center = { lat: Number(latLng.lat().toFixed(6)), lng: Number(latLng.lng().toFixed(6)) }

    onChange(center)

    const address = await geocode(center)
    setValue('description', address)

  }, [geocode, onChange, setValue])
  
  return (
    <AdvancedMarker position={position} draggable={isDraggable} onDragEnd={isDraggable ? onChange : null} />
  )
}

const EditableMap = ({ value, locationType, onChange }) => {
  const { setValue } = useFormContext()
  // console.debug('EditableMap', locationType, value)

  const [bounds, setBounds] = useState(null)

  const handleBoundsChanged = useCallback(e => {
    setBounds(e.map.getBounds())
  }, [setBounds])
  
  const handleChange = useCallback(position => {
    const { latLng } = position
    const { lat, lng } = latLng
    const coordinates = { latitude: lat(), longitude: lng() }
    setValue('marker', coordinates)
    setValue('coordinates', coordinates)
  }, [setValue])

  const hasMarker = useMemo(() => {
    if (value) {
      const { latitude, longitude } = value
      if (!!latitude && !!longitude) {
        return true
      }
    }
    return false
  }, [value])

  const position = useMemo(() => { return value ? { lat: value.latitude, lng: value.longitude } : { lat: 46.5, lng: -73.5 } }, [value])

  const handleClick = useCallback(e => {
    if (!hasMarker) {
      const { detail } = e
      const { latLng } = detail
      const { lat, lng } = latLng
      setValue('type', { id: 'coordonnees' })
      setValue('marker', { latitude: lat, longitude: lng })
      setValue('coordinates', { latitude: lat, longitude: lng })
    }   
  }, [hasMarker, setValue])

  const isMarkerDraggable = locationType?.id === 'coordonnees'

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        language={'fr-CA'}
        mapId={'dark'}
        style={{ width: '100%', height: '250px', cursor: 'default', marginTop: '12px' }}
        defaultCenter={isMarkerDraggable ? position: undefined}
        center={isMarkerDraggable ? undefined : position}
        defaultZoom={isMarkerDraggable ? (value ? 10 : 6) : undefined}
        zoom={isMarkerDraggable ? undefined : (value ? 10 : 6)}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
        onClick={handleClick}
        controlled={!isMarkerDraggable}
      >
        <MapControl position={ControlPosition.TOP_LEFT}>
          <CenterButton currentPosition={position} bounds={bounds} />
        </MapControl>
        { hasMarker && <LocationMarker position={position} onChange={handleChange} isDraggable={isMarkerDraggable} /> }
      </Map>
    </APIProvider>
  )
}

const getMapProps = (data, watched) => {
  return {
     locationType: watched.type
  }
}

const coordinatesSchema = [
  { 
    title: null,
    fields: [
      { label: 'Type de localisation\u00A0:', name: 'type', component: LocationTypeSelect },
      { label: 'Latitude, longitude\u00A0:', name: 'coordinates', component: CoordinatesInput },
      { label: 'Adresse (dérivée)\u00A0:', name: 'description', component: TextDisplay },
      { label: null, name: 'marker', component: EditableMap, props: getMapProps }
    ]
  }
]

const addressSchema = [
  { 
    title: null,
    fields: [
      { label: 'Type de localisation\u00A0:', name: 'type', component: LocationTypeSelect },
      { label: 'Adresse\u00A0:', name: 'description', component: TextInput },
      { label: 'Latitude, longitude (dérivées)\u00A0:', name: 'coordinates', component: CoordinatesDisplay },
      { label: null, name: 'marker', component: EditableMap, props: getMapProps } 
    ]
  }
]

const hasMarker = position => {
  if (position) {
    const { latitude, longitude } = position
    if (!!latitude && !!longitude) {
      return true
    }
  }
  return false
}

const EditLocationDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (data) => {
    // console.debug('handleSubmit', data)
    await updateLocationAction(eventId, data)
    close()
  }, [close, eventId])

  const { type, coordinates, locality, description } = data
  const defaultValues = { type, coordinates, locality, description, marker: coordinates }
  
  return (
    <BaseDialog title={`Événement no ${eventId} - Localisation géographique`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['type', 'marker']}>
      {(contentRef, watched) => {
        const { type, marker } = watched
        const isCoordinateBased = type?.id === 'coordonnees'

        const schema = isCoordinateBased ? coordinatesSchema : addressSchema

        const newPositionMessage = 'Sélectionner un type de localisation et préciser les valeurs dans les champs appropriés, ou cliquer sur la carte pour placer un marqueur.'
        const updateCoordinatesMessage = 'Préciser la latitude et la longitude dans les champs appropriés, ou déplacer le marqueur sur la carte pour modifier.'
        const updateAddressMessage = 'Préciser l"adresse dans le champ approprié.'

        const hasPosition = hasMarker(marker)

        return (
          <>
            <Text>{hasPosition ? ( isCoordinateBased ? updateCoordinatesMessage : updateAddressMessage ) : newPositionMessage}</Text>
            <Fields formSchema={schema} data={data} watched={watched} />
          </>
        )
      }}
    </BaseDialog>
  )
}

export default EditLocationDialog
