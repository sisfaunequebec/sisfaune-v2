'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const EuthanasiaMethodSelect = (props) => {
  const items = useLookup('/api/lookup/euthanasia-methods', null, ['euthanasia-methods'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default EuthanasiaMethodSelect
