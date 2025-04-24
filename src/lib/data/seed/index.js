const orm = require('../database')

const lutEventPrograms = require('./lut-event-programs')
const lutEventStatuses = require('./lut-event-statuses')
// const lutAnimalFamilies = require('./lut-animal-families')
const lutAnimalSpecies = require('./lut-animal-species')
const lutAnimalDeathCauses = require('./lut-animal-death-causes')
const lutAnimalAges = require('./lut-animal-ages')
const lutAnimalGroupsV2 = require('./lut-animal-groups-v2')
const lutAnimalSexes = require('./lut-animal-sexes')
const lutPreservationMethods = require('./lut-preservation-methods')
const lutDiscoveryStates = require('./lut-discovery-states')
const lutEventTypes = require('./lut-event-types')
const labShippingMethods = require('./lut-lab-shipping-methods')
const lutAnalysisSectors = require('./lut-analysis-sector')
const lutSampleTypes = require('./lut-sample-types')
const lutHabitatTypes = require('./lut-habitat-types')
const lutLocalities = require('./lut-locality')
const lutLocalitiesGeom = require('./lut-locality-geom')
const lutEuthanasiaOrganisations = require('./lut-euthanasia-organisations')
const lutLaboratories = require('./lut-laboratories')
const lutReportOrigins = require('./lut-report-origins')
const lutEuthanasiaMethods = require('./lut-euthanasia-methods')

const dataCollaborators = require('./data-collaborators')
const dataEvents = require('./data-events')
const dataLocations = require('./data-locations')

const adminUsers = require('./admin-users')
const adminUserPrograms = require('./admin-user-programs')

async function main () {
  // await orm.$executeRaw`CREATE EXTENSION postgis;`

  await orm.$transaction([
    orm.LutEventProgram.createMany({ data: lutEventPrograms }),
    orm.LutEventStatus.createMany({ data: lutEventStatuses }),
    // orm.LutAnimalFamily.createMany({ data: lutAnimalFamilies }),
    orm.LutAnimalGroupV2.createMany({ data: lutAnimalGroupsV2 }),
    orm.LutAnimalSpecie.createMany({ data: lutAnimalSpecies }),
    orm.lutAnimalDeathCause.createMany({ data: lutAnimalDeathCauses }),
    orm.lutAnimalAge.createMany({ data: lutAnimalAges }),

    orm.LutAnimalSex.createMany({ data: lutAnimalSexes }),
    orm.LutPreservationMethod.createMany({ data: lutPreservationMethods }),
    orm.LutDiscoveryState.createMany({ data: lutDiscoveryStates }),
    orm.LutEventType.createMany({ data: lutEventTypes }),
    orm.LutLabShippingMethod.createMany({ data: labShippingMethods }),
    orm.LutAnalysisSector.createMany({ data: lutAnalysisSectors }),
    orm.LutSampleType.createMany({ data: lutSampleTypes }),
    orm.LutHabitatType.createMany({ data: lutHabitatTypes }),

    orm.LutLocality.createMany({ data: lutLocalities }),
    orm.LutLocalityGeometry.createMany({ data: lutLocalitiesGeom }),

    orm.LutEuthanasiaOrganisation.createMany({ data: lutEuthanasiaOrganisations }),
    orm.LutLaboratory.createMany({ data: lutLaboratories }),
    orm.LutReportOrigin.createMany({ data: lutReportOrigins }),

    orm.LutEuthanasiaMethod.createMany({ data: lutEuthanasiaMethods }),

    orm.Collaborator.createMany({ data: dataCollaborators }),

    orm.User.createMany({ data: adminUsers }),

    orm.Event.createMany({ data: dataEvents }),
    orm.Location.createMany({ data: dataLocations }),

    orm.AdminUserProgram.createMany({ data: adminUserPrograms })

    // orm.$executeRaw`UPDATE lut_muni_geom SET geom = ST_GeomFromText(geom_wkt);`
  ])
}

main()
  .then(async () => {
    await orm.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await orm.$disconnect()
    process.exit(1)
  })
