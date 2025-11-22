'use client'
import { useEffect, useState } from 'react'

// import getLabs from '@/lib/data/lookups/get-labs'

import SelectInput from '@/app/lib/components/inputs/base/select'

const LabSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      // const result = await getLabs()
      const res = await fetch('/api/lookup/labs', { cache: 'force-cache', next: { tags: ['labs'] } })
      const result = await res.json() 
      setItems(result)
    }
    loadTypes()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default LabSelect
