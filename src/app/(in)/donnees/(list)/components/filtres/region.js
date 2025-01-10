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

const Region = ({ value = [], onChange = () => { } }) => {
  return (
    <Checkboxes choices={regions} value={value} onChange={onChange} allChoicesLabel='Toutes les régions' />
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
