'use client'
import { useCallback } from 'react'
// import { DateTime } from 'luxon'

import addAnalysis from './action'

import { Fieldset, Input, Separator, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'

import BaseDialog from '@/app/lib/components/base-dialog'

import ControlledField from '@/app/lib/components/controlled-field'

import ResultTypeSelect from '../../components/result-type-select'
import AnalysisGroupSelect from '../../components/analysis-group-select'
import AnalysisSectorSelect from '../../components/analysis-sector-select'

import addAnalysisSchema from './schema'

const defaultValues = {
  analysisName: null,
  resultTypeId: null,
  isNewGroup: 0,
  newAnalysisGroupName: '',
  analysisGroupId: null,
  analysisSectorId: null
}

const IsNewSelector = (props) => {
  const { value, onChange } = props

  const handleChange = useCallback(e => {
    const { value } = e
    onChange(value)
  }, [onChange])

  return (
    <RadioGroup size='sm' colorPalette='blue' variant='subtle' name='isNewGroup' defaultValue='no' value={value} onValueChange={handleChange}>
      <VStack alignItems='flex-start' gap={1}>
        <Radio value={0}>d&apos;un groupe existant</Radio>
        <Radio value={1}>d&apos;un nouveau groupe</Radio>
      </VStack>
    </RadioGroup>
  )
}

const AddAnalysisDialog = ({ close }) => {
  return (
    <BaseDialog title='Nouvelle analyse' watches={['isNewGroup']} onClose={close} onSubmit={addAnalysis} submitBtnLabel='Ajouter' schema={addAnalysisSchema} defaultValues={defaultValues}>
      {(contentRef, watched) => (
        <Fieldset.Root>
          <Fieldset.Content gap={3}>
            <ControlledField name='analysisName' label={'Nom de l\'analyse :'} variant='horizontal'>
              <Input autoComplete='off' />
            </ControlledField>
            <ControlledField name='resultTypeId' label='Type de résultat :' variant='horizontal'>
              <ResultTypeSelect />
            </ControlledField>
            <Separator />
            <ControlledField name='isNewGroup' label={'L\'analyse fait partie :'} variant='horizontal'>
              <IsNewSelector />
            </ControlledField>
            {watched.isNewGroup === 0 && <ControlledField name='analysisGroupId' label='Groupe :' variant='horizontal'>
              <AnalysisGroupSelect />
            </ControlledField>}
            {watched.isNewGroup === 1 && <ControlledField name='analysisSectorId' label='Secteur :' variant='horizontal'>
              <AnalysisSectorSelect />
            </ControlledField>}
            {watched.isNewGroup === 1 && <ControlledField name='newAnalysisGroupName' label='Nom du nouveau groupe (optionnel) :' variant='horizontal'>
              <Input autoComplete='off' />
            </ControlledField>}
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default AddAnalysisDialog
