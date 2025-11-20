import { userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'
import { dbDateToIso, isoDateToDb } from './utils'

import transform from './transform'

import { locationTransformer } from './location'
import affectedSpeciesTransformer from './affected-species'

const schema = {
  discoveredAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  reportedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  collectedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  closedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  labShippedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  labReceivedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },

  location: { fromDB: locationTransformer },

  affectedSpecies: { fromDB: affectedSpeciesTransformer },

  // analyses: { fromDB: null },
  // specimens: { fromDB: null },
}

const eventTransformer = (event, context, direction = 'fromDB') => {
  const transformed = transform(schema, event, context, direction) 
  return transformed
}



export {
  eventTransformer
}
