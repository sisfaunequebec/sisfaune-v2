'use client'
import { useEffect, useState } from 'react'

// import getDeathCauses from '@/lib/data/lookups/get-death-causes
import getEuthanasiaOrganisations from '@/lib/data/lookups/get-euthanasia-organisations'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EuthanasiaOrganisationSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/euthanasia-organisations', { cache: 'no-cache', next: { tags: ['euthanasia-organisations'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={true}  />
  )
}

export default EuthanasiaOrganisationSelect
