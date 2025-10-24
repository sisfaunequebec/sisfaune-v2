'use client'
import { useState, useEffect, useCallback } from 'react'

import updateGeneralInfos from '../update-general-infos.action'

import getActivePrograms from '@/lib/data/lookups/event-programs'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

// import ControlledField from '@/app/lib/components/controlled-field'

import DateInput from '@/app/lib/components/inputs/base/date'
import SelectInput from '@/app/lib/components/inputs/base/select'

import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'
import CommentInput from '@/app/lib/components/inputs/base/comment'
import NumberInput from '@/app/lib/components/inputs/base/number'

import HabitatTypeSelect from './habitat-type-select'
import ShippingMethodSelect from './shipping-method-select'
import LabSelect from './lab-select'

// import editLaboratorySchema from './edit-laboratory.schema'

const ProgramSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const result = await getActivePrograms()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (<SelectInput items={items} {...props} />)
}

const formSchema = [
  { 
    title: 'Identification',
    fields: [
      { label: 'Numéro d\'événement\u00A0:', name: 'id', disabled: true },
      { label: 'Type d\'événement\u00A0:', name: 'typeId', component: EventTypeSelect, disabled: true },
      { label: 'Numéro d\'identification SILAB\u00A0:', name: 'silabId' },
      { label: 'Numéro d\'incident CQSAS\u00A0:', name: 'cqsasIncidentNumber' },
      { label: 'Numéro de pathologie\u00A0:', name: 'pathologyNumber' },
      { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateInput, props: { clearable: true } },
      { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      { label: 'Programme\u00A0:', name: 'programId', component: ProgramSelect },
      { label: 'Provenance du signalement\u00A0:', name: 'reportOriginId', component: ReportOriginSelect },
      { label: 'Statut\u00A0:', name: 'statusId', component: EventStatusSelect, disabled: (data) => { const { statusId } = data; return statusId === 3 } },
      { label: 'Date de fermeture du dossier\u00A0:', name: 'closedAt', component: DateInput, props: { clearable: false }, disabled: (data, watched) => { const { statusId } = watched; return statusId === 3 }, visible: (data, watched) => { const { closedAt } = data; const { statusId } = watched; return (statusId === 3 && closedAt) } },
    ]
  },
  { 
    title: 'Personnes impliquées',
    fields: [
    ]
  },
  { 
    title: 'Description de l\'événement',
    fields: [
      { label: 'Date de la découverte\u00A0:', name: 'discoveredAt', component: DateInput, props: { clearable: true } },
      { label: 'Date de la récolte\u00A0:', name: 'collectedAt', component: DateInput, props: { clearable: true }  },
      // { label: 'Contacts possibles\u00A0:', name: 'toto'  },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatTypeId', component: HabitatTypeSelect, props: { clearable: true } },
      { label: 'Température (en celsius)\u00A0:', name: 'temperature', component: NumberInput, props: { precision: 1 } },
      // { label: 'Individus affectés, par espèce\u00A0:', name: 'titi' },
      { label: 'Observations sur le terrain\u00A0:', name: 'observations', component: CommentInput },
      { label: 'Commentaires généraux\u00A0:', name: 'comments', component: CommentInput  },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentInput },
    ]
  },
  { 
    title: 'Expédition des spécimens',
    fields: [
      { label: 'Spécimen(s) expédié(s) le\u00A0:', name: 'labShippedAt', component: DateInput, props: { clearable: true } },
      { label: 'Méthode d\'expédition\u00A0:', name: 'labShippingMethodId', component: ShippingMethodSelect  },
      { label: 'Numéro de connaissement\u00A0:', name: 'labShippingTrackingNumber'  },
      { label: 'Laboratoire de destination\u00A0:', name: 'labId', component: LabSelect   }
    ]
  },
]

const EditGeneralInfosDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (data) => {
    await updateGeneralInfos(eventId, data)
    close()
  }, [close, eventId])

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
    <BaseDialog title={'Informations générales'} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['statusId']}>
      {(contentRef, watched) => {
        return (
          // <VStack gap={2}>
            <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
          // </VStack>
        )}
      }
    </BaseDialog>
  )
}

export default EditGeneralInfosDialog
