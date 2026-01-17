'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'
import SelectDisplay from '../display/base/select'

const EventTypeSelect = (props) => {
  const items = useLookup('/api/lookup/event-types', null, ['event-types'])
  if (props.disabled) {
    return (
      <SelectDisplay valueKey={'id'} labelKey={'name'} items={items} value={props.value} />
    )
  } else {
    return (
      <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
    )
  }
}

export default EventTypeSelect
