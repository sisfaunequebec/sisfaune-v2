'use client'
import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

const Status = ({ statuts }) => {
  const [value, setValue] = useQueryState('s', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Checkboxes name='statut' choices={statuts} value={value} onChange={setValue} allChoicesLabel='Tous les statuts' />
  )
}

export default Status
