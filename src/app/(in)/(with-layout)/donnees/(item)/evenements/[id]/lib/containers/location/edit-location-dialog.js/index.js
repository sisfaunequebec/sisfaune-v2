'use client'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'

// import { useIsFirstRender } from '@uidotdev/usehooks'
import { useUpdateEffect } from 'react-use'

import * as turf from '@turf/turf'
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon'

// import updateLaboratory from '../update-laboratory.action'

import { Fieldset, HStack, Button, IconButton, VStack, Input } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/app/lib/components/ui/radio'

import { FaMapMarkerAlt } from 'react-icons/fa'

import { useFormContext } from 'react-hook-form'

import BaseDialog from '@/app/lib/components/dialogs/base'

import { AdvancedMarker, APIProvider, Map, MapControl, Marker, useMap, useMapsLibrary, ControlPosition } from '@vis.gl/react-google-maps'

import ControlledField from '@/app/lib/components/controlled-field'
import TextInput from '@/app/lib/components/inputs/base/text'
import SelectInput from '@/app/lib/components/inputs/base/select'

import schema from './edit-location.schema'

const DEFAULT_CENTER = { lat: 46.5, lng: -73.5 }

const LocationTypeSelect = ({ value, onChange, onBlur, contentRef }) => {
  const items = [
    { value: 'coordonnees', label: 'Coordonnées géographiques' },
    { value: 'adresse', label: 'Adresse' }
  ]
  return (
    <SelectInput items={items} value={value} onChange={onChange} onBlur={onBlur} contentRef={contentRef}  />
  )
}

const decimalRegex = /^-?\d+(\.\d+)?$/ // /^[+-]?(\d+(\.\d*)?|\.\d+)$/   // /^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/

const NumberInput = ({ value, onChange, size }) => {
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
}

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
  // const initialized = useRef(false)
  
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

  }, [geocoder])

  useEffect(() => {
    const updateAdress = async (position) => {
      const address = await geocode(position)
      setValue('address', address)
    }
    updateAdress(position)
  }, [position, geocode, setValue])

  const handleChange = useCallback(async (e) => {
    const { latLng } = e
    const center = { lat: Number(latLng.lat().toFixed(6)), lng: Number(latLng.lng().toFixed(6)) }

    onChange(center)

    const address = await geocode(center)
    setValue('address', address)

  }, [geocode, onChange, setValue])
  
  return (
    <AdvancedMarker position={position} draggable={isDraggable} onDragEnd={isDraggable ? handleChange : null} />
  )
}

const EditableMap = ({ value, locationType, onChange }) => {
  const { setValue } = useFormContext()

  const [bounds, setBounds] = useState(null)

  const handleBoundsChanged = useCallback(e => {
    setBounds(e.map.getBounds())
  }, [setBounds])
  
  const handleChange = useCallback(position => {
    // const { latLng } = e
    // const center = { lat: Number(latLng.lat().toFixed(6)), lng: Number(latLng.lng().toFixed(6)) }
    onChange(position)
    // setValue('locationTypeId', 'coordonnees')
  }, [onChange])

  const showMarker = (value) => {
    if (value) {
      const { lat, lng } = value
      if (!!lat && !!lng) {
        return true
      }
    }
    return false
  }

  const isMarkerDraggable = locationType === 'coordonnees'

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        language={'fr-CA'}
        mapId={'dark'}
        style={{ width: '100%', height: '250px', cursor: 'default' }}
        defaultCenter={isMarkerDraggable ? (value ?? { lat: 46.5, lng: -73.5 }) : undefined}
        center={isMarkerDraggable ? undefined : (value ?? { lat: 46.5, lng: -73.5 })}
        defaultZoom={isMarkerDraggable ? (value ? 10 : 6) : undefined}
        zoom={isMarkerDraggable ? undefined : (value ? 10 : 6)}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
        controlled={!isMarkerDraggable}
      >
        {/* <Geocoder currentPosition={value} /> */}
        <MapControl position={ControlPosition.TOP_LEFT}>
          <CenterButton currentPosition={value} bounds={bounds} />
        </MapControl>
        { showMarker(value) && <LocationMarker position={value} onChange={handleChange} isDraggable={isMarkerDraggable} /> }
      </Map>
    </APIProvider>
  )
}

// const LocationTypeRadio = ({ value, onChange }) => {
//     const handleChange = useCallback(e => {
//       const { value } = e
//       onChange(value)
//     }, [onChange])
  
//     return (
//       <RadioGroup size={'sm'} colorPalette={'blue'} variant={'subtle'} value={value} onValueChange={handleChange}>
//         <VStack alignItems='flex-start' gap={1}>
//           <Radio value={'coordonnees'}>Coordonnées géographiques</Radio>
//           <Radio value={'adresse'}> Adresse civique ou nom de lieu</Radio>
//         </VStack>
//       </RadioGroup>
//     )
// }

const EditLocationDialog = ({ close, eventId, data }) => {
  // const { id: eventId, location } = event
  // console.debug(location)
 
  const handleSubmit = useCallback(async (data) => {
    // await updateLaboratory(eventId, data)
    close()
  }, [close, eventId])

  // Calculate initial values for dialog
  const { typeId: locationTypeId, latitude, longitude, description } = data
  const coordinates = (latitude && longitude) ? { lat: latitude, lng: longitude } : null
  const defaultValues = { locationTypeId, coordinates: coordinates, address: description }

  const message = 'Sélectionner un type de localisation et préciser les valeurs dans les champs appropriés. Ou déplacer le marqueur sur la carte pour modifier.'

  return (
    <BaseDialog title={`Événement no ${eventId} - Localisation géographique`} message={message} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['locationTypeId']}>
      {(contentRef, watched) => {

        const { locationTypeId } = watched
        const isCoordinateBased = locationTypeId === 'coordonnees'

        return (
          <Fieldset.Root>
            <Fieldset.Content gap={2}>
              <ControlledField label={'Type de localisation\u00A0:'} name={'locationTypeId'} variant={'horizontal'}>
                <LocationTypeSelect contentRef={contentRef} />
              </ControlledField>
              <ControlledField label={'Latitude, longitude\u00A0:'} name={'coordinates'} variant={'horizontal'}>
                <LatLongInput contentRef={contentRef} isEditing={isCoordinateBased} />
              </ControlledField>
              <ControlledField label={'Adresse civique ou nom de lieu\u00A0:'} name={'address'} variant={'horizontal'}>
                <TextInput contentRef={contentRef} isEditing={!isCoordinateBased} size={'sm'} />
              </ControlledField>
              <ControlledField name={'coordinates'} variant={'horizontal'} mt={4}>
                <EditableMap locationType={locationTypeId} />
              </ControlledField>  
            </Fieldset.Content>
          </Fieldset.Root>
        )
      }}
    </BaseDialog>
  )
}

export default EditLocationDialog
