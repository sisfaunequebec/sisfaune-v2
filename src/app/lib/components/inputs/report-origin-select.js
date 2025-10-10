'use client'
import { useEffect, useState } from 'react'

import getReportOrigins from '@/lib/data/lookups/get-report-origins'

import SelectInput from '@/app/lib/components/inputs/base/select'

const ReportOriginSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const result = await getReportOrigins({ activeOnly: true })
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput items={items} {...props} />
  )
}

export default ReportOriginSelect
