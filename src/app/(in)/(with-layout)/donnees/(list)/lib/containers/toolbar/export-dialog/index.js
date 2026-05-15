import { useState, useCallback } from 'react'

import wait from '@/utils/wait'

import { Text, Fieldset, Alert } from '@chakra-ui/react'

import useSpecimensCount from '@/lib/data/specimens/use-specimens-count'

import exportDataSchema from './export.schema'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'
import AnalysisGroupMultiselect from './analysis-group-multiselect'

const defaultValues = {
  // format: { value: 'xlsx'}
}

const ExportDialog = ({ close, filters }) => {
  const { data: specimensCount } = useSpecimensCount(filters)

  const [progress, setProgress] = useState(null)

  const handleSubmit = useCallback(async (data) => {
    setProgress({ progress: 0, message: 'Extraction en cours..' })

    const { analysisGroupIds } = data
    const params = {...filters, ...{ analyse: analysisGroupIds ? analysisGroupIds.map(ag => ag.id) : undefined }}

    const response = await fetch('/api/workflow/extraction', { method: 'POST', body: JSON.stringify(params) })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += decoder.decode(value, { stream: true })

      const parts = buffer.split('\n')
      buffer = parts.pop() || ''

      for (const part of parts) {
        if (part.trim()) {
          try {
            const parsed = JSON.parse(part)

            const { progress, message, result } = parsed
            
            if (result) {
              const { filename, url } = result
              saveAs(url, filename)
              await wait(1000)
              return url
            }

            setProgress({ progress, message })
          } catch (err) {
            console.error('Failed to parse JSON chunk:', err)
          }
        }
      }
    }
  }, [setProgress, filters])

  return (
    <BaseDialog title={'Extraction de données'} size={'md'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Extraire'} defaultValues={defaultValues} schema={exportDataSchema} schemaType={'valibot'} progress={progress}>
      {(contentRef) => (
        <Fieldset.Root>
          <Text mb={4} fontWeight={'medium'}>Vous vous apprêtez à extraire les données de {specimensCount} spécimens.</Text>
          <Fieldset.Content gap={1}>
            <ControlledField name={'analysisGroupIds'} label={'Analyses à inclure :'} variant={'vertical'}>
              <AnalysisGroupMultiselect contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ExportDialog
