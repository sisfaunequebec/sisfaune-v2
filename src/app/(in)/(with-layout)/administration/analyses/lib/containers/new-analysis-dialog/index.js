'use client'
import { useCallback } from 'react'

import schema from './new-analysis.schema'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'

import Autocomplete from '@/app/lib/components/inputs/autocomplete'
import SelectInput from '@/app/lib/components/inputs/base/select'

import ResultTypeSelect from '@/app/lib/components/inputs/result-type-select'

import AnalysisSectorSelect from './analysis-sector-select'
// import AnalysisGroupSelect from './analysis-group-select'

const IsNewGroupSelect = (props) => {
  const items = [
    { id: 0, name: 'D\'un groupe existant' },
    { id: 1, name: 'D\'un nouveau groupe' }
  ]

  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}

const AnalysisGroupsCombo = ({ value, onChange }) => {
  const handleLookup = useCallback(async (inputValue) => {
    const response = await fetch(`/api/lookup/analysis-groups?t=${inputValue}`)
    const data = await response.json()
    return data
  } , [])

  const handleRenderItem = useCallback(item => {
    return [item?.name, item?.sectorName]
  }, [])

  const labelKey = useCallback(item => item?.name, [])

  return (
    <Autocomplete value={value} labelKey={labelKey} onLookup={handleLookup} onRenderItem={handleRenderItem} onChange={onChange} placeholder={'Taper pour rechercher un groupe d\'analyses...'} />
  )
}

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Nom de l\'analyse\u00A0:', name: 'name' },
      { label: 'Type de résultats\u00A0:', name: 'resultType', component: ResultTypeSelect }
    ]
  },
  { 
    title: null,
    fields: [
      { label: 'La nouvelle analyse fait partie\u00A0:', name: 'isNewGroup', component: IsNewGroupSelect },
      { label: 'Groupe d\'analyses existant\u00A0:', name: 'analysisGroup', component: AnalysisGroupsCombo, visible: (data, watched) => { const { isNewGroup } = watched; return !isNewGroup } },
      { label: 'Secteur d\'analyse\u00A0:', name: 'analysisSector', component: AnalysisSectorSelect, visible: (data, watched) => { const { isNewGroup } = watched; return isNewGroup } },
      { label: 'Nom du nouveau groupe\u00A0:', name: 'newGroupName', props: { placeholder: 'Optionnel' }, visible: (data, watched) => { const { isNewGroup } = watched; return isNewGroup } }
    ]
  }
]

const NewAnalysisDialog = ({ close, onNew }) => {
  const defaultValues = {
    isNewGroup: false
  }

  const handleSubmit = async (data) => {
    const result = await onNew(data)
    return result
  }

  return (
    <BaseDialog title={'Nouvelle analyse'} watches={['isNewGroup']} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={schema}  schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={{}} />
        )}
      }
    </BaseDialog>
  )
}

export default NewAnalysisDialog
