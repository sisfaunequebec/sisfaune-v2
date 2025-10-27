import { userCanViewAnalysisSection, userCanViewSpecimenSection } from '@/lib/auth/acl'
import { dbDateToIso, isoDateToDb } from './utils'

import transform from './transform'

import { locationTransformer } from './location'

const schema = {
  discoveredAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  reportedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  collectedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  closedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  labShippedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },
  labReceivedAt: { fromDB: dbDateToIso, toDB: isoDateToDb },

  location: { fromDB: locationTransformer },

  // analyses: { fromDB: null },
  // specimens: { fromDB: null },
}

const eventTransformer = (event, context, direction = 'fromDB') => {
  const transformed = transform(schema, event, context, direction) 
  // console.debug('eventTransformer', event, transformed)
  
  // const canUserViewSpecimensSection = userCanViewSpecimenSection(user, programId)
  // const canUserViewAnalysisSection = userCanViewAnalysisSection(user, programId)

  return transformed
}



export {
  eventTransformer
}
