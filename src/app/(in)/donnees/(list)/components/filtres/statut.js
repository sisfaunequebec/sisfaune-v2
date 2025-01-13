import Checkboxes from '../checkboxes'

const statuts = [
  { value: 2, label: 'En cours' },
  { value: 3, label: 'Terminé' }
]

const Statut = ({ value = [], onChange = () => {} }) => {
  
  return (
    <Checkboxes choices={statuts} value={value} onChange={onChange} allChoicesLabel='Tous les statuts' />
  )
}

export default Statut
