import { isoDateToDb } from '../utils'

import transform from '../transform'
import { description } from 'valibot'

const schema = {
  typeId: location => (location.type ? location.type.id : null),
  description: location => location.description,

  latitude: location => location.coordinates?.latitude,
  longitude: location => location.coordinates?.longitude
}

const locationTransformer = (location, context) =>   {
  console.debug('locationTransformer', location)
  return transform(schema, location, context)
}

export default locationTransformer