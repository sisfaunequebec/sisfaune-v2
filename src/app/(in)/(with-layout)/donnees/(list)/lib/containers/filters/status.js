'use client'

import { useMemo } from 'react'
import orderBy from 'lodash.orderby'

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '@/app/lib/components/checkboxes'

const Status = ({ statuts }) => {
  const [value, setValue] = useQueryState('s', parseAsArrayOf(parseAsInteger).withDefault([]))

  const choices = useMemo(() => {
    const choices = statuts.map(p => { return { value: p.id, label: p.name } })
    const sorted = orderBy(choices, ['label'], ['asc'])
    return sorted
  }, [statuts])

  return (
    <Checkboxes name={'statut'} choices={choices} value={value} onChange={setValue} allChoicesLabel='Tous les statuts' />
  )
}

export default Status
