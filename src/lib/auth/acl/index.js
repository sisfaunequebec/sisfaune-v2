const isUserAdmin = (user) => {
  if (!user) {
    return false
  }

  return user.isAdmin
}

const canUserExport = () => {
  return true
}

const canUserSubmitEvent = (user) => {
  if (!user) {
    return false
  }

  const { permissions = [] } = user

  const can = permissions.some(p => p.canSubmit === true)
  return can
}

const filterViewablePrograms = (p) => {
  const { role } = p
  return role !== null
}

const filterSubmitablePrograms = (p) => {
  const { canSubmit } = p
  return canSubmit
}

const canUserViewProgram = (user, programId) => {
  if (!user) {
    return false
  }

  const { permissions = [] } = user
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)

  const can = viewableProgramIds.includes(programId)
  return can
}

const canUserSubmitInProgram = (user, programId) => {
  if (!user) {
    return false
  }

  const { permissions = [] } = user
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