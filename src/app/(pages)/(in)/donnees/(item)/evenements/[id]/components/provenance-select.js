'use client'
import { useState, useEffect } from 'react'

import SelectField from './select-field'
import getReportOrigins from './get-report-origins'

const ProvenanceSelect = ({ label, value, isEditing, onChange }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const items = await getReportOrigins()
      setItems(items)
    }

    getItems()
  }, [])

  return (
    <SelectField label={label} value={value} items={items} isEditing={isEditing} />
  )
}

export default ProvenanceSelect
