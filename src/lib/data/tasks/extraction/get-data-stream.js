
import { PrismaClient } from '@prisma/client'
import cursorStreamExtension from '@/lib/data/stream-extension'

import { getWhereClauseFromParams } from '../../specimens/query-builder'

const client = new PrismaClient()
const prisma = client.$extends(cursorStreamExtension)

const getDataStream = async (params, userId) => {
  console.debug('getDataStream', params, userId)

  const { analyse: analysisGroupIds = [] } = params

  const user = await prisma.User.findFirst({
    where: {
      id: userId
    },
    include: {
      permissions: true
    }
  })

  const whereClause = getWhereClauseFromParams(params, user)

  const dataStream = prisma.Specimen.cursorStream({
    include: {
      event: {
        include: {
          type: {
            select: {
              name: true
            }
          },
          program: {
            select: {
              name: true
            }
          },
          reportOrigin: {
            select: {
              name: true
            }
          },
          status: {
            select: {
              id: true,
              name: true
            }
          },
          submitter: {
            select: {
              firstName: true,
              lastName: true,
              organisation: true
            }
          },
          collaborator: {
            select: {
              name: true
            }
          },
          discoverer: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          labResponsible: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          habitatType: {
            select: {
              name: true
            }
          },
          affectedSpecie1: {
            select: {
              name: true
            }
          },
          affectedSpecie2: {
            select: {
              name: true
            }
          },
          affectedSpecie3: {
            select: {
              name: true
            }
          },
          affectedSpecie4: {
            select: {
              name: true
            }
          },
          affectedSpecie5: {
            select: {
              name: true
            }
          },
          lab: {
            select: {
              name: true
            }
          },
          // labResponsible: {},
          location: {
            include: {
              locality: {
                select: {
                  name: true,
                  mrcName: true,
                  regionName: true
                }
              }
            }
          },
          _count: {
            select: { specimens: true }
          }
        }
      },
      discoveryState: {
        select: {
          name: true
        }
      },
      deathCause: {
        select: {
          name: true
        }
      },
      euthanasiaMethod: {
        select: {
          name: true
        }
      },
      euthanasiaOrganisation: {
        select: {
          name: true
        }
      },
      age: {
        select: {
          name: true
        }
      },
      sex: {
        select: {
          name: true
        }
      },
      measures: {
        include: {
          type: {
            select: {
              name: true,
              unitTypeId: true
            }
          }
        }
      },
      results: {
        where: {
          analysis: {
            analysisGroupId: {
              in: analysisGroupIds
            }
          }
        }
      },
      preservationMethod: {
        select: {
          name: true
        }
      },
      specie: {
        include: {
          group: true
        }
      }
    },
    where: whereClause
  })

  return dataStream
}

export default getDataStream