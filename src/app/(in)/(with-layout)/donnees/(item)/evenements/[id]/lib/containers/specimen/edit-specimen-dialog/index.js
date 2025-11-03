'use client'
import { useState, useEffect, useCallback } from 'react'

// import updateGeneralInfos from '../update-general-infos.action'

import getActivePrograms from '@/lib/data/lookups/event-programs'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

// import DateInput from '@/app/lib/components/inputs/base/date'
import SelectInput from '@/app/lib/components/inputs/base/select'
import CommentInput from '@/app/lib/components/inputs/base/comment'
import DateInput from '@/app/lib/components/inputs/base/date'
import NumberInput from '@/app/lib/components/inputs/base/number'

import DiscoveryStateSelect from './discovery-state-select'
import DeathCauseSelect from './death-cause-select'
import EuthanasiaOrganisationSelect from './euthanasia-organisation-select'
import EuthanasiaMethodSelect from './euthanasia-method-select'
import PreservationMethodSelect from './preservation-method-select copy'

const formSchema = [
  { 
    title: 'Identification du spécimen',
    fields: [
      { label: 'Numéro d\'identification sur le terrain\u00A0:', name: 'terrainIdentificationNumber' },
      { label: 'Numéro de spécimen SILAB\u00A0:', name: 'silabIdentificationNumber' },
      { label: 'Numéro de spécimen CQSAS\u00A0:', name: 'cqsasNumber' },
      { label: 'Numéro d\'enregistement SEFAQ\u00A0:', name: 'sefaqNumber' },
      { label: 'Numéro de permis de chasse\u00A0:', name: 'huntingPermitNumber' },
      { label: 'Marques d\'identification\u00A0:', name: 'identificationMarks', component: CommentInput },
      { label: 'État lors de la découverte\u00A0:', name: 'discoveryStateId', component: DiscoveryStateSelect },
      { label: 'Cause de la mort\u00A0:', name: 'deathCauseId', component: DeathCauseSelect }
    ]
  },
  { 
    title: 'Détails sur l\'euthanasie',
    visible: (data, watched) => { const { deathCauseId } = watched; return [1, 101, 102].includes(deathCauseId) },
    fields: [
      { label: 'Organisme reponsable\u00A0:', name: 'euthanasiaOrganisationId', component: EuthanasiaOrganisationSelect },
      { label: 'Date d\'euthanasie\u00A0:', name: 'euthanizedAt', component: DateInput },
      { label: 'Méthode utilisée\u00A0:', name: 'euthanasiaMethodId', component: EuthanasiaMethodSelect },
      { label: 'Quantité d\'immobilisant utilisée\u00A0:', name: 'productAmount', component: NumberInput, props: { precision: 2 }, visible: (data, watched) => { const { euthanasiaMethodId } = watched; return (euthanasiaMethodId === 1) } },
      { label: 'Numéro de bouteille\u00A0:', name: 'bottleNumber', visible: (data, watched) => { const { euthanasiaMethodId } = watched; return (euthanasiaMethodId === 1) } }
    ]
  },
  { 
    title: 'Mesures',
    fields: [
      { label: 'Âge\u00A0:', name: 'sex', component: SelectInput },
      { label: 'Sexe\u00A0:', name: 'age', component: SelectInput },
      { label: 'Mesures et poids\u00A0:', name: 'measures' }
    ]
  },
  { 
    title: 'Autres informations',
    fields: [
      { label: 'Méthode de conservation\u00A0:', name: 'preservationMethod', component: PreservationMethodSelect },
      { label: 'Remarques\u00A0:', name: 'notes', component: CommentInput },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentInput }
    ]
  }
]

const EditSpecimenDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (data) => {
    console.debug(data)
    // await updateGeneralInfos(eventId, data)
    // close()
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

  const { sequenceId, specie } = data
  const { name } = specie

  return (
    <BaseDialog title={`Spécimen ${eventId}.${sequenceId} - ${name}`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['deathCauseId', 'euthanasiaMethodId']}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditSpecimenDialog
