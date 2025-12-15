'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const HabitatTypeSelect = (props) => {
  const items = useLookup('/api/lookup/habitat-types', null, ['habitat-types'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default HabitatTypeSelect
