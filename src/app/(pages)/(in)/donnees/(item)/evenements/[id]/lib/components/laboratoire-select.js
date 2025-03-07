'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getLabs from '../actions/get-labs'

const LaboratoireSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getLabs()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default LaboratoireSelect
