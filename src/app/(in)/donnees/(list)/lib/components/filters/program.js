'use client'

import { useMemo } from 'react'
import orderBy from 'lodash.orderby'

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

const Program = ({ programmes = [] }) => {
  const [value, setValue] = useQueryState('p', parseAsArrayOf(parseAsInteger).withDefault([]))

  const choices = useMemo(() => {
    const choices = programmes.map(p => { return { value: p.id, label: p.name } })
    const sorted = orderBy(choices, ['label'], ['asc'])
    return sorted
  }, [programmes])

  return (
    <Checkboxes name='programme' choices={choices} value={value} onChange={setValue} allChoicesLabel='Tous les programmes' />
  )
}

export default Program
