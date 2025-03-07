'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getShippingMethods from '../actions/get-shipping-methods'

const MethodeExpeditionSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getShippingMethods()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default MethodeExpeditionSelect
