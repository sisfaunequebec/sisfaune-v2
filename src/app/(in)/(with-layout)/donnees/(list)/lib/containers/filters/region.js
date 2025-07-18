'use client'

import { useMemo } from 'react'
import orderBy from 'lodash.orderby'

import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'
import Checkboxes from '@/app/lib/components/checkboxes'

const Region = ({ regions }) => {
  const [value, setValue] = useQueryState('r', parseAsArrayOf(parseAsInteger).withDefault([]))

  const choices = useMemo(() => {
    const choices = regions.map(p => { return { value: p.regionId, label: p.regionName } })
    const sorted = orderBy(choices, ['label'], ['asc'])
    return sorted
  }, [regions])

  return (
    <Checkboxes name='region' choices={choices} value={value} onChange={setValue} allChoicesLabel='Toutes les régions' />
  )
}

export default Region

// Toutes les régions
//  Abitibi-Témiscamingue
//  Bas-Saint-Laurent
//  Capitale-Nationale
//  Centre-du-Québec
//  Chaudière-Appalaches
//  Côte-Nord
//  Estrie
//  Gaspésie - Îles-de-la-Madeleine
//  Lanaudière
//  Laurentides
//  Laval
//  Mauricie
//  Montérégie
//  Montréal
//  Nord-du-Québec
//  Outaouais
//  Saguenay - Lac-Saint-Jean
