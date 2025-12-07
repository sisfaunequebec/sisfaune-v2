'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const UnitSelect = ({ typeId = 100, ...rest }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/measure-units', { cache: 'force-cache', next: { tags: ['measure-units'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  // console.debug('UnitSelect', items)
  const filteredItems = items.filter(i => i.typeId ===  typeId)

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={filteredItems} {...rest} />
  )
}

export default UnitSelect
