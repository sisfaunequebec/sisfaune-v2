'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'
import SelectDisplay from '../display/base/select'

const EventStatusSelect = ({ value, disabled, ...rest } ) => {
  const items = useLookup('/api/lookup/event-status', null, ['event-status'])
  if (disabled) {
    return (
      <SelectDisplay labelKey={'name'} valueKey={'id'} items={items} value={value} {...rest} />
    )
  } else {
    return (
      <SelectInput labelKey={'name'} valueKey={'id'} items={items} value={value} {...rest} clearable={false} />
    )
  }
}

export default EventStatusSelect
