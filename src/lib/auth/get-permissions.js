// import 'server-only'
import { cache } from 'react'

import { auth } from '@/lib/auth'

import orm from '@/lib/data/database'

const getPermissions = cache(async () => {
  const session = await auth()
  const { user } = session
  const { id } = user

  const userWithPermissions = await orm.User.findFirst({
    where: {
      id
    },
    include: {
      permissions: {
        include: {
          program: true
        }
      }
    }
  })

  const { isAdmin, permissions: permissionsAsArray } =  userWithPermissions

  const permissions = permissionsAsArray.map(p => {
    const { program, programId, roleId: role, canSubmit } = p
    const { name: programName } = program
    return {
      programId,
      programName: programName,
      role,
      canSubmit
    }
  })

  return {
    isAdmin,
    permissions
  }
})

export default getPermissions