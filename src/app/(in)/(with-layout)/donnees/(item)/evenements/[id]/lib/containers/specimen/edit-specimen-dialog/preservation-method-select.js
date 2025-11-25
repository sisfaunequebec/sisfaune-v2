'use client'
import { useEffect, useState } from 'react'

// import getPreservationMethods from '../../../actions/get-preservation-methods'

import SelectInput from '@/app/lib/components/inputs/base/select'

const PreservationMethodSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/preservation-methods', { cache: 'no-cache', next: { tags: ['event-types'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default PreservationMethodSelect
