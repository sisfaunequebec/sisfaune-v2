'use client'
import { useState, useEffect, useCallback } from 'react'

import updateGeneralInfos from '../update-general-infos.action'
import beforeUpdate from './before-update'

import getActivePrograms from '@/lib/data/lookups/event-programs'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

// import CommentDisplay from '@/app/lib/components/display/base/comment'
import TextDisplay from '@/app/lib/components/display/base/text'

import DateInput from '@/app/lib/components/inputs/base/date'
import DateDisplay from '@/app/lib/components/display/base/date'
import SelectInput from '@/app/lib/components/inputs/base/select'

import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'
import CommentInput from '@/app/lib/components/inputs/base/comment'
import NumberInput from '@/app/lib/components/inputs/base/number'

import HabitatTypeSelect from './habitat-type-select'
import ShippingMethodSelect from './shipping-method-select'
import LabSelect from './lab-select'
import CollaboratorSelect from './collaborator-select'

import DiscovererAddressInput from './address'

import Autocomplete from '@/app/(in)/(with-layout)/lib/components/autocomplete'
import CommentDisplay from '@/app/lib/components/display/base/comment'

import AffectedSpeciesInput from './affected-species-input'

const DateClosedInput = (props) => {
  if (props.disabled) {
    return (
      <DateDisplay value={props.value} />
    )
  } else {
    return (
      <DateDisplay {...props} />
    )
  }
}

const SubmitterCombo = ({ value, onChange, ...rest }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/submitters?t=${inputValue}`)
    const data = await response.json()
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [[item?.firstName, item?.lastName].join(' '), [item?.organisation].join(' ')]
  }, [])

  const labelKey = useCallback(item => [item?.firstName, item?.lastName].join(' '), [])

  return (
    <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} {...rest} placeholder={'Taper pour rechercher une personne...'} />
  )
}

const DiscovererSelect = (props) => {
  const { data } = props
  const { status: eventStatus } = data || {}
  const { id: statusId } = eventStatus || {}

  const isEventClosed = statusId === 3

  if (isEventClosed) {
    return (
     <CommentDisplay value={'L\'événement est terminé : les informations sur le découvreur ne sont plus disponibles.'} />
    )
  }

  const items = [
    { id: 1, name: 'Le soumissionnaire' },
    { id: 0, name: 'Une autre personne' }
  ]
  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}

const ContactSelect = (props) => {
  const items = [
    { id: 1, name: 'Oui' },
    { id: 0, name: 'Non' }
  ]
  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}

const ProgramSelect = (props) => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const loadItems = async () => {
      const result = await getActivePrograms()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />)
}

// Status is locked if 1) user is not admin and cannot reopen event or 2) event is closed
const isStatusInputDisabled = (data, watched, { user }) => {
  const { isAdmin, canReopenEvent } = user
  if (isAdmin || canReopenEvent) {
    return false
  } else {
    const { status } = data
    const { id: statusId } = status
    return statusId === 3
  }
}

const formSchema = [
  { 
    title: 'Identification',
    fields: [
      { label: 'Numéro d\'événement\u00A0:', name: 'id', component: TextDisplay },
      { label: 'Type d\'événement\u00A0:', name: 'type', component: EventTypeSelect, disabled: true, props: { clearable: false } },
      { label: 'Numéro d\'identification SILAB\u00A0:', name: 'silabId' },
      { label: 'Numéro d\'incident CQSAS\u00A0:', name: 'cqsasIncidentNumber' },
      { label: 'Numéro de pathologie\u00A0:', name: 'pathologyNumber' },
      { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateInput },
      { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      { label: 'Programme\u00A0:', name: 'program', component: ProgramSelect, props: { clearable: false } },
      { label: 'Provenance du signalement\u00A0:', name: 'reportOrigin', component: ReportOriginSelect, props: { clearable: false } },
      { label: 'Statut\u00A0:', name: 'status', component: EventStatusSelect, disabled: isStatusInputDisabled, props: { clearable: false } },
      { label: 'Date de fermeture du dossier\u00A0:', name: 'closedAt', component: DateClosedInput, props: { clearable: false }, disabled: (data, watched) => { const { status } = watched; const { id: statusId } = status; return statusId === 3 }, visible: (data, watched) => { const { closedAt } = data; const { status } = watched; const { id: statusId } = status; return (statusId === 3 && closedAt) } },
    ]
  },
  { 
    title: 'Personnes impliquées',
    fields: [
      { label: 'Soumis par\u00A0:', name: 'submitter', component: SubmitterCombo },
      // { label: 'Découvert par\u00A0:', name: 'isDiscovererSameAsSubmitter', component: DiscovererSameAsSubmitterSelect },
      { label: 'Découvert par\u00A0:', name: 'isDiscovererSameAsSubmitter', component: DiscovererSelect },
      { label: 'Découveur\u00A0:', name: 'discoverer', component: DiscovererAddressInput, visible: (data, watched) => { const { isDiscovererSameAsSubmitter } = watched; const { status: eventStatus } = data; const { id: statusId } = eventStatus || {}; const isEventClosed = statusId === 3; return !isEventClosed && !isDiscovererSameAsSubmitter;  } },
      { label: 'Récolté par (contractuel)\u00A0:', name: 'collaborator', component: CollaboratorSelect }
    ]
  },
  { 
    title: 'Description de l\'événement',
    fields: [
      { label: 'Date de la découverte\u00A0:', name: 'discoveredAt', component: DateInput, props: { clearable: true } },
      { label: 'Date de la récolte\u00A0:', name: 'collectedAt', component: DateInput, props: { clearable: true }  },
      { label: 'Un humain a été en contact\u00A0?', name: 'hadHumanContact' , component: ContactSelect },
      { label: 'Un animal domestique a été en contact\u00A0?', name: 'hadAnimalContact' , component: ContactSelect },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatType', component: HabitatTypeSelect, props: { clearable: true } },
      { label: 'Température\u00A0:', name: 'temperature', component: NumberInput, props: { precision: 1, suffix: '(en celsius)' } },
      { label: 'Observations sur le terrain\u00A0:', name: 'observations', component: CommentInput },
      { label: 'Commentaires généraux\u00A0:', name: 'comments', component: CommentInput  },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentInput },
    ]
  },
  { 
    title: 'Individus affectés, par espèce',
    fields: [
      { label: null, name: 'affectedSpecies', component: AffectedSpeciesInput },
    ]
  },
  { 
    title: 'Expédition des spécimens',
    fields: [
      { label: 'Spécimen(s) expédié(s) le\u00A0:', name: 'labShippedAt', component: DateInput, props: { clearable: true } },
      { label: 'Méthode d\'expédition\u00A0:', name: 'labShippingMethod', component: ShippingMethodSelect  },
      { label: 'Numéro de connaissement\u00A0:', name: 'labShippingTrackingNumber'  },
      { label: 'Laboratoire de destination\u00A0:', name: 'lab', component: LabSelect, props: { clearable: true }  }
    ]
  },
]

const EditGeneralInfosDialog = ({ close, eventId, data }) => {

  const handleSubmit = useCallback(async (updating) => {
    const updated = beforeUpdate(data, updating)
    await updateGeneralInfos(eventId, updated)
    close()
  }, [close, eventId, data])

  const fieldNames = formSchema.map(section => {
    const { fields } = section
    return fields
  }).flat().map(field => field.name)
  
  const defaultValues = fieldNames.reduce((acc, name) => {
    const value = data[name]
    acc[name] = value
    return acc
  }, {})

  return (
    <BaseDialog title={`Événement no ${eventId} - Informations générales`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} defaultValues={defaultValues} watches={['status', 'isDiscovererSameAsSubmitter']}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditGeneralInfosDialog
