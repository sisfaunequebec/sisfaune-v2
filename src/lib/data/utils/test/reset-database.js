// import bcrypt from 'bcrypt'
import orm from '../../database'

import lutEventTypes from '../../seed/lut-event-types'
import lutEventPrograms from '../../seed/lut-event-programs'
import lutEventStatuses from '../../seed/lut-event-statuses'
import lutReportOrigins from '../../seed/lut-report-origins'
import lutAnimalDeathCauses from '../../seed/lut-animal-death-causes'
import lutPreservationMethods from '../../seed/lut-preservation-methods'

const resetDatabase = async (project) => {

  await orm.$transaction([
    orm.$executeRaw`SET session_replication_role = replica;`,

    orm.Specimen.deleteMany(),
    orm.Event.deleteMany(),
    orm.User.deleteMany(),

    orm.LutEventType.deleteMany(),
    orm.LutEventProgram.deleteMany(),
    orm.LutEventStatus.deleteMany(),
    orm.LutReportOrigin.deleteMany(),
    orm.lutAnimalDeathCause.deleteMany(),
    orm.LutPreservationMethod.deleteMany(),

    orm.LutEventType.createMany({ data: lutEventTypes }),
    orm.LutEventProgram.createMany({ data: lutEventPrograms }),
    orm.LutEventStatus.createMany({ data: lutEventStatuses }),
    orm.LutReportOrigin.createMany({ data: lutReportOrigins }),
    orm.lutAnimalDeathCause.createMany({ data: lutAnimalDeathCauses }),
    orm.LutPreservationMethod.createMany({ data: lutPreservationMethods }),

    orm.$executeRaw`SET session_replication_role = DEFAULT;`
  ])
}

export {
  resetDatabase
}
