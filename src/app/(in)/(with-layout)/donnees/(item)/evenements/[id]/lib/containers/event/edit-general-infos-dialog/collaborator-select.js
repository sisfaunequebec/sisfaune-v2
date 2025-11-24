'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const CollaboratorSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const queryParams = {
        active: 1
      }
      const queryString = new URLSearchParams(queryParams).toString();
      const res = await fetch(`/api/lookup/collaborators?${queryString}`, { cache: 'no-cache', next: { tags: ['collaborators'] } })
      const result = await res.json() 
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default CollaboratorSelect
