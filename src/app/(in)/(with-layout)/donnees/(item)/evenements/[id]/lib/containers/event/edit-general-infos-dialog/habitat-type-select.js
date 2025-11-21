'use client'
import { useEffect, useState } from 'react'

import getHabitatTypes from '@/lib/data/lookups/get-habitat-types'

import SelectInput from '@/app/lib/components/inputs/base/select'

const HabitatTypeSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const result = await getHabitatTypes()
      setItems(result)
    }
    loadTypes()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default HabitatTypeSelect
