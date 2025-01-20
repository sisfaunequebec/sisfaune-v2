import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

import { STATUSES } from '@/logic/data/events/service'

const Statut = () => {
  const [value, setValue] = useQueryState('s', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Checkboxes name={'statut'} choices={STATUSES} value={value} onChange={setValue} allChoicesLabel={'Tous les statuts'} />
  )
}

export default Statut
