'use client'
import { useEffect, useState } from 'react'

// import getEventStatuses from '@/lib/data/lookups/get-event-statuses'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EventStatusSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/event-status', { cache: 'force-cache', next: { tags: ['event-status'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (<SelectInput labelKey={'name'} valueKey={'id'} items={items} {...props} clearable={false} />)
}

export default EventStatusSelect
