const isUserAdmin = (user) => {
  if (!user) {
    return false
  }

  return user.isAdmin
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
  const { roleId } = p
  console.debug('filterViewablePrograms', roleId)
  return !!roleId
}

const canUserViewProgram = (user, programId) => {
  if (!user) {
    return false
  }

  const { permissions = [] } = user
  
  const viewableProgramIds = permissions.filter(filterViewablePrograms).map(p => p.programId)
  console.debug('viewableProgramIds', viewableProgramIds, programId)

  const can = viewableProgramIds.includes(programId)
  return can
}

export {
  isUserAdmin,
  canUserSubmitEvent,
  canUserViewProgram
}