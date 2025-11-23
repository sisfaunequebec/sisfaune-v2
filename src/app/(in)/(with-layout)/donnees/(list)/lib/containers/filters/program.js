'use client'

import { useMemo } from 'react'
import orderBy from 'lodash.orderby'

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '@/app/lib/components/checkboxes'

const Program = ({ programs = [] }) => {
  const [value, setValue] = useQueryState('p', parseAsArrayOf(parseAsInteger).withDefault([]))

  const choices = useMemo(() => {
    const choices = programs.map(p => { return { value: p.id, label: p.name } })
    const sorted = orderBy(choices, ['label'], ['asc'])
    return sorted
  }, [programs])

  return (
    <Checkboxes name={'programme'} choices={choices} value={value} onChange={setValue} allChoicesLabel={'Tous les programmes'} />
  )
}

export default Program
