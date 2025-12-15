'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

import useLookup from '@/lib/data/lookups/use-lookup'

const CollaboratorSelect = (props) => {
  const items = useLookup('/api/lookup/collaborators', { active: 1 }, ['collaborators'])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default CollaboratorSelect
