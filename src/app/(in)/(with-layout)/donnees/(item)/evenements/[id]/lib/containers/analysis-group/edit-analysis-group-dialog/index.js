'use client'
import { useState, useEffect, useCallback } from 'react'

// import { useFormContext } from 'react-hook-form'

// import updateGeneralInfos from '../update-general-infos.action'
// import beforeUpdate from './before-update'

// import getActivePrograms from '@/lib/data/lookups/event-programs'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import DateInput from '@/app/lib/components/inputs/base/date'
import SelectInput from '@/app/lib/components/inputs/base/select'

// import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
// import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
// import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'
// import CommentInput from '@/app/lib/components/inputs/base/comment'
// import NumberInput from '@/app/lib/components/inputs/base/number'

// import HabitatTypeSelect from './habitat-type-select'
// import ShippingMethodSelect from './shipping-method-select'
// import LabSelect from './lab-select'
// import CollaboratorSelect from './collaborator-select'

// import DiscovererAddressInput from './address'

// import Autocomplete from '@/app/(in)/(with-layout)/lib/components/autocomplete'
import UnimplementedDisplay from '@/app/lib/components/display/base/unimplemented'

// const AffectedSpeciesInput = ({ value, data }) => {
//   // console.debug('AffectedSpeciesInput', value)
//   return null
// }

// const SubmitterCombo = ({ value, onChange, ...rest }) => {
//   const handleLookup = useCallback(async (inputValue) => {
//     const response = await fetch(`/api/lookup/submitters?t=${inputValue}`)
//     const data = await response.json()
//     return data
//   } , [])

//   const handleRenderItem = useCallback(item => {
//     return [[item?.firstName, item?.lastName].join(' '), [item?.organisation].join(' ')]
//   }, [])

//   const labelKey = useCallback(item => [item?.firstName, item?.lastName].join(' '), [])

//   return (
//     <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} {...rest} placeholder={'Taper pour rechercher une personne...'} />
//   )
// }

// const DiscovererSameAsSubmitterSelect = (props) => {
//   const items = [
//     { id: 1, name: 'Le soumissionnaire' },
//     { id: 0, name: 'Une autre personne' }
//   ]
//   const handleChange = (selected) => {
//     props.onChange(selected.id === 1)
//   }
//   return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
// }
// const ContactSelect = (props) => {
//   const items = [
//     { id: 1, name: 'Oui' },
//     { id: 0, name: 'Non' }
//   ]
//   const handleChange = (selected) => {
//     props.onChange(selected.id === 1)
//   }
//   return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
// }

// const ProgramSelect = (props) => {
//   const [items, setItems] = useState([])
//   useEffect(() => {
//     const loadItems = async () => {
//       const result = await getActivePrograms()
//       setItems(result)
//     }
//     loadItems()
//   }, [setItems])

//   return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />)
// }

const formSchema = [
  { 
    title: null,
    fields: [
      // { label: 'Numéro d\'événement\u00A0:', name: 'id', disabled: true },
      // { label: 'Type d\'événement\u00A0:', name: 'type', component: EventTypeSelect, disabled: true, props: { clearable: false } },
      // { label: 'Numéro d\'identification SILAB\u00A0:', name: 'silabId' },
      // { label: 'Numéro d\'incident CQSAS\u00A0:', name: 'cqsasIncidentNumber' },
      // { label: 'Numéro de pathologie\u00A0:', name: 'pathologyNumber' },
      // { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateInput },
      // { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      // { label: 'Programme\u00A0:', name: 'program', component: ProgramSelect, props: { clearable: false } },
      // { label: 'Provenance du signalement\u00A0:', name: 'reportOrigin', component: ReportOriginSelect, props: { clearable: false } },
      // { label: 'Statut\u00A0:', name: 'status', component: EventStatusSelect, disabled: (data) => { const { status } = data; const {id: statusId } = status; return statusId === 3 }, props: { clearable: false } },
      // { label: 'Date de fermeture du dossier\u00A0:', name: 'closedAt', component: DateInput, props: { clearable: false }, disabled: (data, watched) => { const { status } = watched; const { id: statusId } = status; return statusId === 3 }, visible: (data, watched) => { const { closedAt } = data; const { status } = watched; const { id: statusId } = status; return (statusId === 3 && closedAt) } },
    ]
  }
]

const EditAnalysisGroupDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (updating) => {
    console.debug('EditGeneralInfosDialog - handleSubmit', updating)
    // const updated = beforeUpdate(data, updating)
    // await updateGeneralInfos(eventId, updated)
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

  const { name } = data
  

  return (
    <BaseDialog title={`Événement no ${eventId} - ${name}`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['status', 'isDiscovererSameAsSubmitter']}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditAnalysisGroupDialog
