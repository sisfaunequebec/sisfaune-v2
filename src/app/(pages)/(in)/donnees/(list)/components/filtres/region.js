import { useQueryState, parseAsInteger, parseAsArrayOf } from 'nuqs'
import Checkboxes from '../checkboxes'

const regionsRaw = [
  'Abitibi-Témiscamingue', 'Bas-Saint-Laurent', 'Capitale-Nationale', 'Centre-du-Québec', 'Chaudière-Appalaches', 'Côte-Nord', 'Estrie', 'Gaspésie - Îles-de-la-Madeleine', 'Lanaudière', 'Laurentides', 'Laval', 'Mauricie', 'Montérégie', 'Montréal', 'Nord-du-Québec', 'Outaouais', 'Saguenay - Lac-Saint-Jean'
]

const regions = regionsRaw.map((r, i) => {
  return {
    value: i + 1,
    label: r
  }
})

const Region = () => {
  const [value, setValue] = useQueryState('region', parseAsArrayOf(parseAsInteger).withDefault([]))
  return (
    <Checkboxes name={'region'} choices={regions} value={value} onChange={setValue} allChoicesLabel={'Toutes les régions'} />
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
