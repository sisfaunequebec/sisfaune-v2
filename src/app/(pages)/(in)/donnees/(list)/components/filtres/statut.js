import { useQueryState, useQueryStates, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

const statuts = [
  { value: 2, label: 'En cours' },
  { value: 3, label: 'Terminé' }
]

const Statut = ({ onChange = () => {} }) => {
  const [value, setValue] = useQueryState('statut', parseAsArrayOf(parseAsInteger).withDefault([]))

  // console.debug('render statut')
  
  return (
    <Checkboxes choices={statuts} value={value} onChange={v => setValue(v)} allChoicesLabel={'Tous les statuts'} />
  )
}

export default Statut
