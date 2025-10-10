'use client'
import { useState, useEffect, useCallback } from 'react'

// import updateLaboratory from '../update-laboratory.action'

import getActivePrograms from '@/lib/data/lookups/event-programs'

import { Fieldset, Input, VStack, Separator } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

import DateInput from '@/app/lib/components/inputs/base/date'
import SelectInput from '@/app/lib/components/inputs/base/select'

import EventStatusSelect from '@/app/lib/components/inputs/event-status-select'
import EventTypeSelect from '@/app/lib/components/inputs/event-type-select'
import ReportOriginSelect from '@/app/lib/components/inputs/report-origin-select'
import CommentInput from '@/app/lib/components/inputs/base/comment'

import HabitatTypeSelect from './habitat-type-select'
import ShippingMethodSelect from './shipping-method-select'
import LabSelect from './lab-select'

// import editLaboratorySchema from './edit-laboratory.schema'

// const ReceivedByCombo = ({ value, onChange }) => {
//   const handleLookup = useCallback(async (inputValue) => {
//     const response = await fetch(`/api/lookup/lab-receivers?t=${inputValue}`)
//     const data = await response.json()
//     return data
//   } , [])

//   const handleRenderItem = useCallback(item => {
//     return [[item?.label].join(' ')]
//   }, [])

//   const labelKey = useCallback(item => [item?.label].join(' '), [])

//   return (
//     <Autocomplete value={value} valueKey={'id'} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} allowCustomValue={true} />
//   )
// }

// const ResponsibleCombo = ({ value, onChange }) => {
//   const handleLookup = useCallback(async (inputValue) => {
//     const response = await fetch(`/api/lookup/lab-responsibles?t=${inputValue}`)
//     const data = await response.json()
//     return data
//   } , [])

//   const handleRenderItem = useCallback(item => {
//     return [[item?.firstName, item?.lastName].join(' '), [item?.organisation].join(' ')]
//   }, [])

//   const labelKey = useCallback(item => [item?.firstName, item?.lastName].join(' '), [])

//   return (
//     <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} />
//   )
// }

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
      { label: 'Date du signalement\u00A0:', name: 'reportedAt', component: DateInput },
      { label: 'Numéro centrale MAPAQ\u00A0:', name: 'mapaqId' },
      { label: 'Programme\u00A0:', name: 'programId', component: ProgramSelect },
      { label: 'Provenance du signalement\u00A0:', name: 'reportOriginId', component: ReportOriginSelect },
      { label: 'Statut\u00A0:', name: 'statusId', component: EventStatusSelect, disabled: (data) => { const { statusId } = data; return statusId === 3 } },
      { label: 'Date de fermeture du dossier\u00A0:', name: 'closedAt', component: DateInput, disabled: (data, watched) => { const { statusId } = watched; return statusId === 3 }, visible: (data, watched) => { const { closedAt } = data; const { statusId } = watched; return (statusId === 3 && closedAt) } },
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
      { label: 'Date de la découverte\u00A0:', component: DateInput, name: 'discoveredAt' },
      { label: 'Date de la récolte\u00A0:', component: DateInput, name: 'collectedAt'  },
      { label: 'Contacts possibles\u00A0:', name: 'toto'  },
      { label: 'Type d\'habitat\u00A0:', name: 'habitatTypeId', component: HabitatTypeSelect  },
      { label: 'Température\u00A0:', name: 'temperature'  },
      { label: 'Individus affectés, par espèce\u00A0:', name: 'titi'  },
      { label: 'Observations sur le terrain\u00A0:', name: 'observations', component: CommentInput },
      { label: 'Commentaires généraux\u00A0:', name: 'comments', component: CommentInput  },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentInput },
    ]
  },
  { 
    title: 'Expédition des spécimens',
    fields: [
      { label: 'Spécimen(s) expédié(s) le\u00A0:', name: 'labShippingDate', component: DateInput },
      { label: 'Méthode d\'expédition\u00A0:', name: 'labShippingMethod', component: ShippingMethodSelect  },
      { label: 'Numéro de connaissement\u00A0:', name: 'labShippingTrackingNumber'  },
      { label: 'Laboratoire de destination\u00A0:', name: 'labId', component: LabSelect   }
    ]
  },
]

const EditGeneralInfosDialog = ({ close, eventId, data }) => {
 
  const handleSubmit = useCallback(async (data) => {
    // await updateLaboratory(eventId, data)
    close()
  }, [close, eventId])

  console.debug(data)

  return (
    <BaseDialog title={'Informations générales'} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={data} watches={['statusId']}>
      {(contentRef, watched) => {
        // console.debug(watched)
        return (
          <Fieldset.Root as={VStack} gap={2}>
            {formSchema.map(section => {
              const { title, fields } = section
              return (
                <>
                  <Fieldset.Legend>{title}</Fieldset.Legend>
                  <Fieldset.Content gap={2}>
                    {fields.map(f => {
                      const { label, name, type, disabled = false, visible = true, component } = f
                      const isDisabled = (typeof disabled === 'function') ? disabled(data, watched) : disabled
                      const isVisible = (typeof visible === 'function') ? visible(data, watched) : visible
                      const Component = component || Input
                      // console.debug(name, isDisabled)
                      if (!isVisible) { return null }
                      return (
                        <ControlledField key={name} label={label} name={name} variant={'horizontal'}>
                          <Component contentRef={contentRef} disabled={isDisabled} />
                        </ControlledField>
                      )
                    })}
                  </Fieldset.Content>
                  <Separator />
                </>
              )
            })}
            {/* <Fieldset.Content gap={2}>
              <ControlledField label={'Numéro d\'événement\u00A0:'} name={'id'} variant={'horizontal'}>
                <Input contentRef={contentRef} disabled={true} />
              </ControlledField>
              <ControlledField label={'Type d\'événement\u00A0:'} name={'typeId'} variant={'horizontal'}>
                <Input contentRef={contentRef} disabled={true} />
              </ControlledField>
              <ControlledField label={'Numéro d\'identification SILAB\u00A0:'} name={'silabId'} variant={'horizontal'}>
                <Input contentRef={contentRef} />
              </ControlledField>
              <ControlledField label={'Numéro d\'incident CQSAS\u00A0:'} name={'cqsasIncidentNumber'} variant={'horizontal'}>
                <Input contentRef={contentRef} />
              </ControlledField>
              <ControlledField label={'Numéro d\'incident CQSAS\u00A0:'} name={'cqsasIncidentNumber'} variant={'horizontal'}>
                <Input contentRef={contentRef} />
              </ControlledField>
            </Fieldset.Content> */}
          </Fieldset.Root>
        )}
      }
    </BaseDialog>
  )
}

export default EditGeneralInfosDialog
