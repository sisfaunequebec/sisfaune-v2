import {
  parseAsInteger,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

const searchParams = {
  tri: parseAsString,
  direction: parseAsString,
  texte: parseAsString,
  statut: parseAsArrayOf(parseAsInteger),

  offset: parseAsInteger,
  take: parseAsInteger
}

const urlKeys = { tri: 'o', direction: 'd', texte: 't', statut: 's' }

export {
  searchParams,
  urlKeys
}
