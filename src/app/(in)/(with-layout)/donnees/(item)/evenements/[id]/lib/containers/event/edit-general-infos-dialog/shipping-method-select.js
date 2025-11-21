'use client'
import { useEffect, useState } from 'react'

import getShippingMethods from '@/lib/data/lookups/get-shipping-methods'

import SelectInput from '@/app/lib/components/inputs/base/select'

const ShippingMethodSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const result = await getShippingMethods()
      setItems(result)
    }
    loadTypes()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default ShippingMethodSelect
