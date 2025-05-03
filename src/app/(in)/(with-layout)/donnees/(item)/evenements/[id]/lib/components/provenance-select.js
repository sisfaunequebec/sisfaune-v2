'use client'
import { useCallback } from 'react'

import getReportOrigins from '@/lib/data/lookups/get-report-origins'

import SelectFieldAdvanced from '../../../../../../../../lib/components/select-field-advanced'

const ProvenanceSelect = ({ label, value, isEditing }) => {
  const getter = useCallback(async () => {
    return getReportOrigins({ value, activeOnly: true })
  }, [value])

  return (
    <SelectFieldAdvanced isEditing={isEditing} label={label} value={value} valueLabelKey='name' getter={getter} />
  )
}

export default ProvenanceSelect
