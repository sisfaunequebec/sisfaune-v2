'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getDiscoveryStates from '../actions/get-discovery-states'

const EtatDecouverteSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getDiscoveryStates()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default EtatDecouverteSelect
