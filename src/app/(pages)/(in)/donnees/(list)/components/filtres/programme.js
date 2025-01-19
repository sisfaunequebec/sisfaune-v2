import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'

import Checkboxes from '../checkboxes'

const programmes = [
  { value: 11, label: 'Évaluation de la contamination par le plomb' },
  { value: 1, label: 'Surveillance de la MDC' },
  { value: 2, label: 'Surveillance de la rage du raton laveur' },
  { value: 3, label: 'Surveillance de la santé des chauves-souris' },
  { value: 4, label: 'Surveillance de la septicémie hémorragique virale' },
  { value: 5, label: 'Surveillance de l\'influenza aviaire' },
  { value: 6, label: 'Surveillance des salmonelles' },
  { value: 7, label: 'Surveillance passive de la rage (analyse ACIA)' },
  { value: 8, label: 'Surveillance régulière' }
]

const Programme = () => {
  const [value, setValue] = useQueryState('programme', parseAsArrayOf(parseAsInteger).withDefault([]))

  return (
    <Checkboxes choices={programmes} value={value} onChange={v => setValue(v)} allChoicesLabel={'Tous les programmes'} />
  )
}

export default Programme
