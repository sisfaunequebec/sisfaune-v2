import {
  parseAsInteger,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

const searchParams = {
  texte: parseAsString,
  statut: parseAsArrayOf(parseAsInteger),
  programme: parseAsArrayOf(parseAsInteger),
  region: parseAsArrayOf(parseAsInteger),
  groupe: parseAsArrayOf(parseAsInteger),

  date: parseAsString,
  debut: parseAsString,
  fin: parseAsString,

  tri: parseAsString,
  direction: parseAsString,

  offset: parseAsInteger,
  take: parseAsInteger
}

const urlKeys = { 
  tri: 'o', direction: 'd', texte: 't', statut: 's', programme: 'p', region: 'r', groupe: 'g',
  
  date: 'dt',
  debut: 'dd',
  fin: 'df'
}
export {
  searchParams,
  urlKeys
}
