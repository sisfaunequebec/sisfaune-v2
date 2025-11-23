'use client'
import { useEffect, useState } from 'react'
// import { revalidateTag } from 'next/cache'

// import getEventTypes from '@/lib/data/lookups/get-event-types'

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

  // useEffect(() => {
  //   const loadTypes = async () => {
  //     const result = await getEventTypes()
  //     setTypes(result)
  //   }
  //   loadTypes()
  // }, [setTypes])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={types} {...props} clearable={false} />
  )
}

export default EventTypeSelect
