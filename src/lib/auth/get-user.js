'use server'
import 'server-only'

import { cache } from 'react'

import { auth } from '@/lib/auth'

import orm from '@/lib/data/database'

const getUser = async () => {
  const session = await auth()

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

  const { email, lastName, firstName, isAdmin, canReopenEvent, permissions: permissionsAsArray } =  userWithPermissions

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

  return {
    id,
    fullName,
    email,
    isAdmin,
    canReopenEvent,
    permissions
  }
}

export default getUser