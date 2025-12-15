'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const EuthanasiaOrganisationSelect = (props) => {
  const items = useLookup('/api/lookup/euthanasia-organisations', null, ['euthanasia-organisations'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={true}  />
  )
}

export default EuthanasiaOrganisationSelect
