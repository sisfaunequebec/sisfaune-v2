'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const ReportOriginSelect = (props) => {
  const items = useLookup('/api/lookup/report-origins', null, ['report-origins'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
  )
}

export default ReportOriginSelect
