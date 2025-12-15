'use client'
import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const EventStatusSelect = (props) => {
  const items = useLookup('/api/lookup/event-status', null, ['event-status'])

  return (<SelectInput labelKey={'name'} valueKey={'id'} items={items} {...props} clearable={false} />)
}

export default EventStatusSelect
