'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EventTypeSelect = (props) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const res = await fetch('/api/lookup/event-types', { cache: 'force-cache', next: { tags: ['event-types'] } })
      const types = await res.json()
      setTypes(types)
    }
    loadTypes()
  }, [setTypes])
  
  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={types} {...props} clearable={false} />
  )
}

export default EventTypeSelect
