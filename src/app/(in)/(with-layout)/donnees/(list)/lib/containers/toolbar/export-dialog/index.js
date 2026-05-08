import { useState, useCallback } from 'react'

import wait from '@/utils/wait'

// import { startExtraction } from '@/lib/data/tasks/extraction/service'

import { Text, Fieldset, Alert } from '@chakra-ui/react'

import exportDataSchema from './export.schema'

import BaseDialog from '@/app/lib/components/dialogs/base'

import ControlledField from '@/app/lib/components/controlled-field'

// import FormatSelect from './format-select'
import AnalysisGroupMultiselect from './analysis-group-multiselect'

import useSpecimensCount from '@/lib/data/specimens/use-specimens-count'

const defaultValues = {
  // format: { value: 'xlsx'}
}

const ExportDialog = ({ close, filters, onExport }) => {
  // const { data: specimensCount } = useSpecimensCount(filters)
  // console.debug('ExportDialog - filters:', specimensCount)

  const [progress, setProgress] = useState({})

  const handleSubmit = useCallback(async (data) => {
    // setProgress({ progress: 1, message: null })

    const response = await fetch('/api/workflow/extraction', { method: 'POST', body: {} })

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
  }, [setProgress])

  // const handleSubmit = async (data) => {
  //   // const { format } = data
  //   // const { value } = format
  //   const { analysisGroupIds } = data
  //   const params = {...filters, ...{ analyse: analysisGroupIds ? analysisGroupIds.map(ag => ag.id) : undefined }}
  //   // const result = await onExport(params)

  //   for (let i = 1; i <= 100; i++) {
  //     setProgress(i)
  //     await wait(1)
  //   }

  //   const result = 1
    
  //   return result
  // }

  // const message = `Vous vous apprêtez à extraire les informations relatives à ${specimensCount ?? 0} spécimen(s).`

  return (
    <BaseDialog title={'Extraction de données'} size={'md'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Extraire'} defaultValues={defaultValues} schema={exportDataSchema} schemaType={'valibot'} progress={progress}>
      {(contentRef) => (
        <Fieldset.Root>
          {/* <Text mb={1} fontWeight={'medium'}>{message}</Text> */}
          {/* <Alert.Root status={'info'} mb={4}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                Pour modifier les spécimens inclus dans l&apos;extraction, veuillez utiliser les filtres disponibles sur la page. Par défaut, <strong>tous les spécimens</strong> sont inclus. 
              </Alert.Description>
            </Alert.Content>
          </Alert.Root> */}
          <Fieldset.Content gap={1}>
            <ControlledField name={'analysisGroupIds'} label={'Analyses à inclure :'} variant={'horizontal'}>
              <AnalysisGroupMultiselect contentRef={contentRef} />
            </ControlledField>
          </Fieldset.Content>
        </Fieldset.Root>
      )}
    </BaseDialog>
  )
}

export default ExportDialog
