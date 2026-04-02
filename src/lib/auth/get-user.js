'use server'
import 'server-only'

import { auth } from '@/lib/auth'

import orm from '@/lib/data/database'

const getUser = async () => {
  const session = await auth()

  if (!session) {
    return null
  }

  const { user } = session ?? {}
  const { id } = user ?? {}

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

  const { username, email, lastName, firstName, isAdmin, password, canReopenEvent, permissions: permissionsAsArray } =  userWithPermissions

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

  const fullName = [firstName, lastName].filter(Boolean).join(' ')

  const isFirstLogin = !password

  return {
    id,
    username,
    fullName,
    email,
    isAdmin,
    canReopenEvent,
    permissions,
    isFirstLogin
  }
}

export default getUser