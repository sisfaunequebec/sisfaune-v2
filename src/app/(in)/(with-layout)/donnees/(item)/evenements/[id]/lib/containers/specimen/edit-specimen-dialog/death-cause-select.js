'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const DeathCauseSelect = (props) => {
  const items = useLookup('/api/lookup/death-causes', null, ['death-causes'])
 
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
  )
}

export default DeathCauseSelect
