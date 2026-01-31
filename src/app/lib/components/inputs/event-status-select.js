'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'
import SelectDisplay from '../display/base/select'

const EventStatusSelect = (props) => {
  const items = useLookup('/api/lookup/event-status', null, ['event-status'])
  if (props.disabled) {
    return (
      <SelectDisplay valueKey={'id'} labelKey={'name'} items={items} value={props.value} />
    )
  } else {
    return (
      <SelectInput labelKey={'name'} valueKey={'id'} items={items} {...props} clearable={false} />
    )
  }
}

export default EventStatusSelect
