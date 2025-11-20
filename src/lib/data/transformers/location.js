import { dbDateToIso, isoDateToDb } from './utils'

import transform from './transform'

const fixCoordinates = (value) => {
  return value ? parseFloat(value.toString()) : 0
}

const schema = {
  latitude: { fromDB: fixCoordinates },
  longitude: { fromDB: fixCoordinates },
  locality: { fromDB: (locality) => { return { name: locality?.name, province: locality?.province }} },
}

const locationTransformer = (location, data, context, direction = 'fromDB') => {
  const transformed = transform(schema, location, context, direction) 
  return transformed
}

export {
  locationTransformer
}
