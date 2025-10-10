'use client'
import { useEffect, useState } from 'react'

import getLabs from '@/lib/data/lookups/get-labs'

import SelectInput from '@/app/lib/components/inputs/base/select'

const LabSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const result = await getLabs()
      setItems(result)
    }
    loadTypes()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default LabSelect
