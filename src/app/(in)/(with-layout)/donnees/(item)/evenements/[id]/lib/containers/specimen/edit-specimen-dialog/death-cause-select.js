'use client'
import { useEffect, useState } from 'react'

// import getDeathCauses from '@/lib/data/lookups/get-death-causes'

import SelectInput from '@/app/lib/components/inputs/base/select'

const useFetchItems = (url, cacheTags = []) => {
  const [items, setItems] = useState([])

  console.debug(process.env.NODE_ENV)
  const isDev = process.env.NODE_ENV === 'development'

  const cache = isDev ? 'no-cache' : 'force-cache'
  
  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/death-causes', { cache , next: { tags: cacheTags } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems, cache, cacheTags])

  return items
}

const DeathCauseSelect = (props) => {
  const [items, setItems] = useState([])

  const items2 = useFetchItems('/api/lookup/death-causes', 'event-types')
  console.debug(items2)

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/death-causes', { cache: 'no-cache', next: { tags: ['event-types'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
  )
}

export default DeathCauseSelect
