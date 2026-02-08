import {
  parseAsInteger,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

const searchParams = {
  tri: parseAsString,
  direction: parseAsString,
  texte: parseAsString,
  secteur: parseAsArrayOf(parseAsInteger),

  offset: parseAsInteger.withDefault(0),
  take: parseAsInteger.withDefault(25)
}

const urlKeys = { tri: 'o', direction: 'd', texte: 't', secteur: 's' }

export {
  searchParams,
  urlKeys
}
