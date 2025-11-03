'use client'
import { useEffect, useState } from 'react'

import getPreservationMethods from '../../../actions/get-preservation-methods'

import SelectInput from '@/app/lib/components/inputs/base/select'

const PreservationMethodSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const result = await getPreservationMethods()
      setItems(result)
    }
    load()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default PreservationMethodSelect
