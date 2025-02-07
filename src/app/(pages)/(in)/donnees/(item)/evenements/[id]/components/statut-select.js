'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getStatuses from './get-statuses'

const StatutSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getStatuses()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default StatutSelect
