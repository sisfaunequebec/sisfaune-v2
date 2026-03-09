'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import orderBy from 'lodash.orderby'

import { useSWRConfig } from 'swr'

import { DragDropProvider } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers'
import { RestrictToElement } from '@dnd-kit/dom/modifiers'

import wait from '@/utils/wait'

import getAnalysisAction from './get-analysis.action'
import updateAnalysisAction from './update-analysis.action'

import schema from './edit-analysis.schema'

import { Flex, VStack } from '@chakra-ui/react'

import BaseDialog, { Fields } from '@/app/lib/components/dialogs/base'
import { Row } from '@/app/lib/components/dialogs/wrappers'

import TextDisplay from '@/app/lib/components/display/base/text'
import TextInput from '@/app/lib/components/inputs/base/text'
import NumberInput from '@/app/lib/components/inputs/base/number'
import SelectInput from '@/app/lib/components/inputs/base/select'
import YesNoSelect from '@/app/lib/components/inputs/base/yes-no'

import ResultTypeSelect from '@/app/lib/components/inputs/result-type-select'

const ActiveInactiveSelect = (props) => {
  const items = [
    { id: 1, name: 'Active' },
    { id: 0, name: 'Inactive' }
  ]
  const handleChange = (selected) => {
    props.onChange(selected.id === 1)
  }
  return (<SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} onChange={handleChange} value={{ id: (props.value === true ? 1 : 0) }} />)
}

const SortableRow = ({ id, index, children }) => {
  const [element, setElement] = useState(null)
  const handleRef = useRef(null)

  const { ref } = useSortable({ id, index, element, handle: handleRef })

  return (
    <Row ref={setElement} label={null} w={'full'} >
      <Flex gap={2} alignItems={'center'} bg={'white'} cursor={'grab'} _active={{ cursor: 'grabbing' }}>
        <Flex ref={handleRef} cursor={'grab'} color={'gray.500'} _active={{ cursor: 'grabbing' }} mr={2}>|||</Flex>
        {children}
      </Flex>
    </Row>
  )
}
  
const ResultsCodesInput = ({ value: codeValues = [], onChange, size, contentRef  }) => {
  // console.debug('codeValues', codeValues)
  const containerRef = useRef(null)

  return (
    <Flex direction={'column'} w={'full'} gap={4} justifyContent={'flex-start'}>
      <Row label={'Valeurs acceptées\u00A0:'} fontWeight={'medium'} gap={2}>
        {/* <Flex flex={2}>Valeur</Flex>
        <Flex flex={3}>Description</Flex>
        <Flex flex={2}>&nbsp;</Flex> */}
      </Row>
      <DragDropProvider
        modifiers={[
          RestrictToVerticalAxis,
          RestrictToElement.configure({ element: containerRef.current }),
        ]}   
        onDragEnd={(event) => {
          console.debug('Drag end', event)
        }}
      >
        <VStack w={'full'} flex={2} gap={2} justifyContent={'flex-start'} mb={2} ref={containerRef}>
          {orderBy(codeValues, ['displayOrder'], ['asc']).map((codeValue) => {
            const { id, code, description, isActive } = codeValue
            return (
              <SortableRow id={id.toString()} key={id} label={null} w={'full'} gap={2} alignItems={'center'} >
                {/* <RoleSelect
                  w={'full'}
                  flex={4}
                  value={roleId && { id: roleId }}
                  onChange={(role) => handleRoleChange(programId, role)}
                  contentRef={contentRef}
                  clearable={true}
                /> */}
                {/* <Flex flex={1}></Flex> */}
                <TextInput flex={2} value={code} size={size} />
                <TextInput flex={3} value={description} size={size} />
                <ActiveInactiveSelect contentRef={contentRef} flex={2} value={isActive} />
              </SortableRow>
            )
          })}
        </VStack>
      </DragDropProvider>
    </Flex>
  )
}

const formSchema = [
  { 
    title: null,
    fields: [
      { label: 'Nom de l\'analyse\u00A0:', name: 'name' },
      { label: 'Code de l\'analyse (MAPAQ)\u00A0:', name: 'code' },
      { label: 'Groupe d\'analyse\u00A0:', name: 'groupName', component: TextDisplay },
      { label: 'Secteur d\'analyse\u00A0:', name: 'sectorName', component: TextDisplay },
      { label: 'Type de résultats\u00A0:', name: 'resultType', component: ResultTypeSelect, disabled: true },
      { label: 'Active\u00A0:', name: 'isActive', component: YesNoSelect }
    ]
  },
  { 
    title: 'Gestion des résultats',
    visible: (data, watched) => [1, 2].includes(data.resultType?.id),
    fields: [
      
      { label: 'Borne inférieure\u00A0:', name: 'lowerLimit', component: NumberInput, props: { precision: 5 }, visible: (data, watched) => [1].includes(data.resultType?.id) },
      { label: 'Borne supérieure\u00A0:', name: 'upperLimit', component: NumberInput, props: { precision: 5 }, visible: (data, watched) => [1].includes(data.resultType?.id) },
      { label: 'Unité\u00A0:', name: 'unit', visible: (data, watched) => [1].includes(data.resultType?.id) },
      // { label: null, name: 'codeValues', component: ResultsCodesInput, visible: (data, watched) => [2].includes(data.resultType?.id) }
    ]
  }
]

const EditAnalysisDialog = ({ analysisId, close }) => {
  const { mutate, cache } = useSWRConfig()

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = useCallback(async (data) => {
    console.debug('Submitting data', data)
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

  console.debug('defaultValues', defaultValues)

  return (
    <BaseDialog title={'Modification d\'une analyse'} onClose={close} onSubmit={handleSubmit} submitBtnLabel={'Sauvegarder'} schema={schema} schemaType={'valibot'} defaultValues={defaultValues}>
      {(contentRef, watched) => {
        return (
          <Fields formSchema={formSchema} contentRef={contentRef} watched={watched} data={data} />
        )}
      }
    </BaseDialog>
  )
}

export default EditAnalysisDialog
