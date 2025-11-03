'use client'
import { useEffect, useState } from 'react'

// import getDeathCauses from '@/lib/data/lookups/get-death-causes
import getEuthanasiaMethods from '@/lib/data/lookups/get-euthanasia-methods'

import SelectInput from '@/app/lib/components/inputs/base/select'

const EuthanasiaMethodSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getEuthanasiaMethods()
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default EuthanasiaMethodSelect
