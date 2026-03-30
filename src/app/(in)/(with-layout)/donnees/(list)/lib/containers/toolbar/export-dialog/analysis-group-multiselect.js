'use client'
import { useMemo } from 'react'

import useLookup from '@/lib/data/lookups/use-lookup'
import MultiselectInput from '@/app/lib/components/inputs/base/multiselect'

const AnalysisGroupMultiselect = (props) => {
  const items = useLookup('/api/lookup/analysis-groups', null, ['analysis-groups'])
  const sortedItems = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'accent' })), [items])
  return (
    <MultiselectInput valueKey={'id'} labelKey={'name'} items={sortedItems} {...props} />
  )
}

export default AnalysisGroupMultiselect
