import {
  parseAsBoolean  
} from 'nuqs/server'

import { createParser, parseAsInteger } from 'nuqs/server'

const parseStringIntegerAsBoolean = createParser({
  parse(queryValue) {
    // console.debug('parseStringIntegerAsBoolean', queryValue, typeof queryValue)
    return queryValue === '1' ? true : false
  },
  serialize(value) {
    return value ? '1' : '0'
  }
})

const searchParams = {
  active: parseStringIntegerAsBoolean
}

const urlKeys = { 
  active: 'active'
}

export {
  searchParams,
  urlKeys
}
