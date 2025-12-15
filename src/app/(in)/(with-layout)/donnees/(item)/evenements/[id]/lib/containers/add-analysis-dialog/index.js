'use client'
import { useCallback } from 'react'

import addAnalysisAction from './add-analysis.action'
import schema from './add-analysis-schema'

import { Fieldset, Input } from '@chakra-ui/react'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
import Autocomplete from '@/app/lib/components/inputs/autocomplete'

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

const defaultValues = {
  analysisGroup: undefined
}
const AddAnalysisDialog = ({ eventId, close }) => {
  const handleSubmit = useCallback(async (data) => {
    const { analysisGroup } = data
    const payload = {
      analysisGroupId: analysisGroup?.id ?? undefined
    }
    const result = await addAnalysisAction(eventId, payload)
    console.debug('handleSubmit', result)
    return result
  }, [eventId])

  return (
    <BaseDialog title={`Ajout d\'un nouveau groupe d\'analyses à l\'événement no ${eventId}`} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Ajouter'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef) => (
        <Fieldset.Root>
          <Fieldset.Content gap={1}>
            <ControlledField name='analysisGroup' label={'Groupe d\'analyses :'} variant='horizontal'>
              <AnalysisGroupsCombo ontentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddAnalysisDialog
