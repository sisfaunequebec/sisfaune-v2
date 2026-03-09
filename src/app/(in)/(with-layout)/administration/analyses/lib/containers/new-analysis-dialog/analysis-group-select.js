'use client'

import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const AnalysisGroupSelect = (props) => {
  const items = useLookup('/api/lookup/analysis-groups', null, ['analysis-groups'])
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default AnalysisGroupSelect
