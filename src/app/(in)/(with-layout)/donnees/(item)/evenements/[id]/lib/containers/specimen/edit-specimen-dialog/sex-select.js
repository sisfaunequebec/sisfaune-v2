'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const SexSelect = (props) => {
  const items = useLookup('/api/lookup/animal-sexes', null, ['animal-sexes'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default SexSelect
