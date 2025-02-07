'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getEventTypes from './get-event-types'

const TypeEvenementSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getEventTypes()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default TypeEvenementSelect
