'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const PreservationMethodSelect = (props) => {
  const items = useLookup('/api/lookup/preservation-methods', null, ['preservation-methods'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default PreservationMethodSelect
