'use client'
import { useEffect, useState } from 'react'

// import getCollaborators from '@/lib/data/lookups/get-collaborators'

import SelectInput from '@/app/lib/components/inputs/base/select'

const CollaboratorSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      // const result = await getCollaborators(true)
      const res = await fetch('/api/lookup/collaborators', { cache: 'force-cache', next: { tags: ['collaborators'] } })
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
