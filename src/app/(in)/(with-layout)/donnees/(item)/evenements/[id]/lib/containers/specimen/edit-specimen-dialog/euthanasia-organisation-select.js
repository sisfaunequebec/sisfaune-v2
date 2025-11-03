'use client'
import { useEffect, useState } from 'react'

// import getDeathCauses from '@/lib/data/lookups/get-death-causes
import getEuthanasiaOrganisations from '@/lib/data/lookups/get-euthanasia-organisations'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EuthanasiaOrganisationSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getEuthanasiaOrganisations()
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default EuthanasiaOrganisationSelect
