'use client'
import { useEffect, useState } from 'react'

import getDeathCauses from '@/lib/data/lookups/get-death-causes'

import SelectInput from '@/app/lib/components/inputs/base/select'

const DeathCauseSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getDeathCauses()
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default DeathCauseSelect
