'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getDeathCauses from '../actions/get-death-causes'

const CauseMortSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getDeathCauses()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default CauseMortSelect
