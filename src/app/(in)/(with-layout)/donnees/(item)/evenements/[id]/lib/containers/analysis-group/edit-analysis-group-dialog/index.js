'use client'
import { useState, useEffect, useCallback } from 'react'

import updateAnalysisGroupAction from './update-analysis-group.action'
import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import AnalysisGroupInput from './analysis-group-input'

const formSchema = [
  { 
    title: null,
    fields: [
      { label: null, name: 'analyses', component: AnalysisGroupInput }
    ]
  }
]

const EditAnalysisGroupDialog = ({ close, eventId, data }) => {
  const handleSubmit = useCallback(async (updating) => {
    await updateAnalysisGroupAction(eventId, updating)
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

  const { name: analysisGroupName } = data

  return (
    <BaseDialog title={`Événement no ${eventId} - ${analysisGroupName}`} size={'xl'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={null} schemaType={'valibot'} defaultValues={defaultValues} watches={['status', 'isDiscovererSameAsSubmitter']}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={defaultValues} />
        )}
      }
    </BaseDialog>
  )
}

export default EditAnalysisGroupDialog
