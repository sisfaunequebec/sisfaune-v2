'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getAges from '../actions/get-ages'

const AgeSelect = ({ label, value, group, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getAges(group)
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default AgeSelect
