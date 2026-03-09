'use client'

import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const AnalysisSectorSelect = (props) => {
  const items = useLookup('/api/lookup/analysis-sectors', null, ['analysis-sectors'])
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default AnalysisSectorSelect
