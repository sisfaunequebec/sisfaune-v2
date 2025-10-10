'use client'
import { useEffect, useState } from 'react'

import getEventStatuses from '@/lib/data/lookups/get-event-statuses'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EventStatusSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const result = await getEventStatuses()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (<SelectInput items={items} {...props} />)
}

export default EventStatusSelect
