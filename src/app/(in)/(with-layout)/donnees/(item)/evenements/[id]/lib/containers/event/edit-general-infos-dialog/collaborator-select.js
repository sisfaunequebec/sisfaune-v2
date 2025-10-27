'use client'
import { useEffect, useState } from 'react'

import getCollaborators from '@/lib/data/lookups/get-collaborator'

import SelectInput from '@/app/lib/components/inputs/base/select'

const CollaboratorSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getCollaborators(true)
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default CollaboratorSelect
