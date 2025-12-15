'use client'
import { useMemo } from 'react'

import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const UnitSelect = ({ typeId = 100, ...rest }) => {
  const items = useLookup('/api/lookup/measure-units', null, ['measure-units'])
  const filteredItems = useMemo(() => items.filter(i => i.typeId ===  typeId), [typeId, items])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={filteredItems} {...rest} />
  )
}

export default UnitSelect
