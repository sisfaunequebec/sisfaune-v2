import { createParser, parseAsString } from 'nuqs/server'

// const parseStringIntegerAsBoolean = createParser({
//   parse(queryValue) {
//     return queryValue === '1' ? true : false
//   },
//   serialize(value) {
//     return value ? '1' : '0'
//   }
// })

const searchParams = {
  // active: parseStringIntegerAsBoolean,
  texte: parseAsString
}

const urlKeys = { 
  // active: 'active',
  texte: 't'
}

export {
  searchParams,
  urlKeys
}
