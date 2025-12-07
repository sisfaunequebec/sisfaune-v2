'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'

import { VStack, HStack, Flex, Field as ChakraField } from '@chakra-ui/react'
import { numericFormatter } from 'react-number-format'

import updateSpecimenAction from '../update-specimen.action'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import SelectInput from '@/app/lib/components/inputs/base/select'
import CommentInput from '@/app/lib/components/inputs/base/comment'
import DateInput from '@/app/lib/components/inputs/base/date'
import NumberInput from '@/app/lib/components/inputs/base/number'

import DiscoveryStateSelect from '../../../components/discovery-state-select'
import DeathCauseSelect from './death-cause-select'
import EuthanasiaOrganisationSelect from './euthanasia-organisation-select'
import EuthanasiaMethodSelect from './euthanasia-method-select'
import PreservationMethodSelect from './preservation-method-select'
import AgeSelect from './age-select'
import SexSelect from './sex-select'

import MeasuresInput from './measures-input'

import schema from './edit-specimen.schema'

const watchedField = ['deathCause', 'euthanasiaMethod']

const formSchema = [
  { 
    title: 'Identification du spécimen',
    fields: [
      // { label: 'Espèce\u00A0:', name: 'specie' },
      { label: 'Numéro d\'identification sur le terrain\u00A0:', name: 'terrainIdentificationNumber' },
      { label: 'Numéro de spécimen SILAB\u00A0:', name: 'silabIdentificationNumber' },
      { label: 'Numéro de spécimen CQSAS\u00A0:', name: 'cqsasNumber' },
      { label: 'Numéro d\'enregistement SEFAQ\u00A0:', name: 'sefaqNumber' },
      { label: 'Numéro de permis de chasse\u00A0:', name: 'huntingPermitNumber' },
      { label: 'Marques d\'identification\u00A0:', name: 'identificationMarks', component: CommentInput },
      { label: 'État lors de la découverte\u00A0:', name: 'discoveryState', component: DiscoveryStateSelect },
      { label: 'Cause de la mort\u00A0:', name: 'deathCause', component: DeathCauseSelect }
    ]
  },
  { 
    title: 'Détails sur l\'euthanasie',
    visible: (data, watched) => { const { deathCause } = watched; const { id: deathCauseId } = deathCause; return [1, 101, 102].includes(deathCauseId) },
    fields: [
      { label: 'Organisme reponsable\u00A0:', name: 'euthanasiaOrganisation', component: EuthanasiaOrganisationSelect },
      { label: 'Date d\'euthanasie\u00A0:', name: 'euthanizedAt', component: DateInput },
      { label: 'Méthode utilisée\u00A0:', name: 'euthanasiaMethod', component: EuthanasiaMethodSelect },
      { label: 'Quantité d\'immobilisant utilisée\u00A0:', name: 'productAmount', component: NumberInput, props: { precision: 2 }, visible: (data, watched) => { const { euthanasiaMethod } = watched; const euthanasiaMethodId = euthanasiaMethod?.id; return (euthanasiaMethodId === 1) } },
      { label: 'Numéro de bouteille\u00A0:', name: 'bottleNumber', visible: (data, watched) => { const { euthanasiaMethod } = watched; const euthanasiaMethodId = euthanasiaMethod?.id; return (euthanasiaMethodId === 1) } }
    ]
  },
  { 
    title: 'Mesures',
    fields: [
      { label: 'Âge\u00A0:', name: 'age', component: AgeSelect },
      { label: 'Sexe\u00A0:', name: 'sex', component: SexSelect },
      { label: null, name: 'measures', component: MeasuresInput }
    ]
  },
  { 
    title: 'Autres informations',
    fields: [
      { label: 'Méthode de conservation\u00A0:', name: 'preservationMethod', component: PreservationMethodSelect, props: { clearable: false } },
      { label: 'Remarques\u00A0:', name: 'notes', component: CommentInput },
      { label: 'Mots-clés\u00A0:', name: 'keywords', component: CommentInput }
    ]
  }
]

const EditSpecimenDialog = ({ close, eventId, specimenId, data }) => {

  console.debug('EditSpecimenDialog data', data)

  const handleSubmit = useCallback(async (data) => {
    console.debug('EditSpecimenDialog handleSubmit', data)
    await updateSpecimenAction(eventId, specimenId, data)
    close()
  }, [close, eventId, specimenId])

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
    <BaseDialog title={`Spécimen no ${eventId}.${sequenceId} - ${name}`} size={'lg'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues} watches={watchedField}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={data} />
        )}
      }
    </BaseDialog>
  )
}

export default EditSpecimenDialog
