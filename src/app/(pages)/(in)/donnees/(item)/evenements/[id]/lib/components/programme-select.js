'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getPrograms from '../actions/get-programs'

const ProgrammeSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getPrograms()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default ProgrammeSelect
