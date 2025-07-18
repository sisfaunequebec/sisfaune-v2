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
  start: parseAsString,
  end: parseAsString,

  tri: parseAsString,
  direction: parseAsString,

  offset: parseAsInteger,
  take: parseAsInteger
}

const urlKeys = { 
  tri: 'o', direction: 'd', texte: 't', statut: 's', programme: 'p', region: 'r', groupe: 'g',
  date: 'dd',
  start: 'sd',
  end: 'ed'
}
export {
  searchParams,
  urlKeys
}
