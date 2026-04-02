// import wait from '@/utils/wait'

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
  const { data: specimensCount } = useSpecimensCount(filters)
  console.debug('ExportDialog - filters:', specimensCount)

  const handleSubmit = async (data) => {
    // const { format } = data
    // const { value } = format
    const { analysisGroupIds } = data
    const params = {...filters, ...{ analyse: analysisGroupIds ? analysisGroupIds.map(ag => ag.id) : undefined }}
    const result = await onExport(params)
    return result
  }

  const message = `Vous vous apprêtez à extraire les informations relatives à ${specimensCount ?? 0} spécimen(s).`

  return (
    <BaseDialog title={'Extraction de données'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Extraire'} defaultValues={defaultValues} schema={exportDataSchema} schemaType={'valibot'}>
      {(contentRef) => (
        <Fieldset.Root>
          <Text mb={1} fontWeight={'medium'}>{message}</Text>
          <Alert.Root status={'info'} mb={4}>
            <Alert.Indicator />
            <Alert.Content>
              {/* <Alert.Title><strong>Vous vous apprêtez à extraire les informations relatives à {specimensCount} spécimens</strong></Alert.Title> */}
              <Alert.Description>
                Pour modifier les spécimens inclus dans l&apos;extraction, veuillez utiliser les filtres disponibles sur la page. Par défaut, <strong>tous les spécimens</strong> sont inclus. 
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
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
