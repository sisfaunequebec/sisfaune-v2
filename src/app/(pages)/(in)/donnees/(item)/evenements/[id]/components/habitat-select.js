'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getHabitatTypes from './get-habitat-types'

const HabitatSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getHabitatTypes()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default HabitatSelect
