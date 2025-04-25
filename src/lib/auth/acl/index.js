const isUserAdmin = (userPermissions) => {
  if (!userPermissions) {
    return false
  }

  return userPermissions.isAdmin
}

const canUserExport = () => {
  return true
}

const canUserSubmitEvent = (userPermissions) => {
  if (!userPermissions) {
    return false
  }

  const { permissions = [] } = userPermissions

  const can = permissions.some(p => p.canSubmit === true)
  return can
}

const filterViewablePrograms = (p) => {
  const { role } = p
  return !!role
}

const filterSubmitablePrograms = (p) => {
  const { canSubmit } = p
  return canSubmit
}

const canUserViewProgram = (userPermissions, programId) => {
  if (!userPermissions) {
    return false
  }

  const { permissions = [] } = userPermissions
  
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const can = viewableProgramIds.includes(programId)
  return can
}

const canUserSubmitInProgram = (userPermissions, programId) => {
  if (!userPermissions) {
    return false
  }

  const { permissions = [] } = userPermissions
  
  const viewableProgramIds = permissions.filter(filterSubmitablePrograms).map(p => p.programId)

  const can = viewableProgramIds.includes(programId)
  return can
}

export {
  isUserAdmin,
  canUserExport,
  canUserSubmitEvent,
  canUserViewProgram,
  canUserSubmitInProgram
}