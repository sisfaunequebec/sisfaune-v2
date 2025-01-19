import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

const statuts = [
  { value: 2, label: 'En cours' },
  { value: 3, label: 'Terminé' }
]

const Statut = () => {
  const [value, setValue] = useQueryState('statut', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Checkboxes name={'statut'} choices={statuts} value={value} onChange={setValue} allChoicesLabel={'Tous les statuts'} />
  )
}

export default Statut
