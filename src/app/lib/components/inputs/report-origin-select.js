'use client'
import { useEffect, useState } from 'react'

import getReportOrigins from '@/lib/data/lookups/get-report-origins'

import SelectInput from '@/app/lib/components/inputs/base/select'

const ReportOriginSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      // const result = await getReportOrigins({ activeOnly: true })
      const res = await fetch('/api/lookup/report-origins', { cache: 'force-cache', next: { tags: ['report-origins'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
  )
}

export default ReportOriginSelect
