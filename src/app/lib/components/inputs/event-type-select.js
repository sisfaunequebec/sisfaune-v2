'use client'
import { useEffect, useState } from 'react'

import getEventTypes from '@/lib/data/lookups/get-event-types'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EventTypeSelect = (props) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const result = await getEventTypes()
      // console.debug(result)
      setTypes(result)
    }
    loadTypes()
  }, [setTypes])

  return (
    <SelectInput items={types} {...props} />
  )
}

export default EventTypeSelect
