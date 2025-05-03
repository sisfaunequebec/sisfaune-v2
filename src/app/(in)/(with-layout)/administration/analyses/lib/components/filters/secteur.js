'use client'

import { useMemo } from 'react'
import orderBy from 'lodash.orderby'

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '@/app/lib/components/checkboxes'
// import Checkboxes from '../checkboxes'

const Secteur = ({ secteurs }) => {
  const [value, setValue] = useQueryState('s', parseAsArrayOf(parseAsInteger).withDefault([]))

  const choices = useMemo(() => {
    const choices = secteurs.map(p => { return { value: p.id, label: p.name } })
    const sorted = orderBy(choices, ['label'], ['asc'])
    return sorted
  }, [secteurs])

  return (
    <Checkboxes name='secteur' choices={choices} value={value} onChange={setValue} allChoicesLabel='Tous les secteurs' />
  )
}

export default Secteur
