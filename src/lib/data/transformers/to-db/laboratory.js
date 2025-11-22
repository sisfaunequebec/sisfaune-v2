import { isoDateToDb } from '../utils'
// import locationTransformer from './location.js'
// import affectedSpeciesTransformer from './affected-species.js'

import transform from '../transform'

const schema = {
  labReceivedAt: data => isoDateToDb(data.labReceivedAt),
  labResponsibleId : data => (data.labResponsible ? data.labResponsible.id : null),
  labReceivedBy: data => (data.labReceivedBy ? data.labReceivedBy.id : null)
}

const laboratoryTransformer = (event, context) =>   {
  return transform(schema, event, context)
}

export default laboratoryTransformer