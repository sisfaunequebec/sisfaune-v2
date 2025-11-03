'use client'
import { useEffect, useState } from 'react'

// import getDeathCauses from '@/lib/data/lookups/get-death-causes
import getDiscoveryStates from '@/lib/data/lookups/get-discovery-states'

import SelectInput from '@/app/lib/components/inputs/base/select'

const DiscoveryStateSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getDiscoveryStates()
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default DiscoveryStateSelect
