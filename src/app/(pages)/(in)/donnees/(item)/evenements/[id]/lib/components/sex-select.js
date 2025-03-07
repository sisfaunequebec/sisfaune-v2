'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getSexes from '../actions/get-sexes'

const SexSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getSexes()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default SexSelect
