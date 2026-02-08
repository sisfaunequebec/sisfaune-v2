'use client'
import { useState, useEffect, useCallback } from 'react'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import getAnalysisAction from './get-analysis.action'
import updateAnalysisAction from './update-analysis.action'
import editAnalysiSchema from './edit-analysis.schema'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import YesNoSelect from '@/app/lib/components/inputs/base/yes-no'
import ResultTypeSelect from '@/app/lib/components/inputs/result-type-select'
import TextDisplay from '@/app/lib/components/display/base/text'

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Nom de l\'analyse\u00A0:', name: 'name' },
      { label: 'Nom de l\'analyse (MAPAQ)\u00A0:', name: 'code' },
      { label: 'Groupe d\'analyse\u00A0:', name: 'groupName', component: TextDisplay },
      { label: 'Secteur d\'analyse\u00A0:', name: 'sectorName', component: TextDisplay },
      { label: 'Type de résultats\u00A0:', name: 'resultType', component: ResultTypeSelect, disabled: true },
      { label: 'Active\u00A0:', name: 'isActive', component: YesNoSelect }

      
    ]
  },
    { 
    title: 'Gestion des résultats',
    fields: [
    ]
  }
]

const EditAnalysisDialog = ({ analysisId, close }) => {
  const { mutate, cache } = useSWRConfig()

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = useCallback(async (data) => {
    const result = await updateAnalysisAction(analysisId, data)

    if (result) {
      await wait(1000)
      for (const key of cache.keys()) {
        if (key.includes('/api/admin/analyses')) {
          mutate(key)
        }
      }
    }
    
    return result
  }, [analysisId, mutate, cache])

  useEffect(() => {
    async function loadAnalysis() {
      try {
        setIsLoading(true)
        const fetchedData = await getAnalysisAction(analysisId)
        setData(fetchedData)
      } catch (err) {
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalysis()
  }, [analysisId])
  
  if (isLoading) { return null }

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
    <BaseDialog title={'Modification d\'une analyse'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={editAnalysiSchema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={data} />
        )}
      }
    </BaseDialog>
  )
}

export default EditAnalysisDialog
