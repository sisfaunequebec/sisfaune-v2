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

// ROLES

// soumissionnaire
// gestion
// laboratoire
// consultation

const PERMISSION_LEVEL = {
  consultation: 1,
  ajout: 2,
  modification: 4,
  effacement: 8
}

const EVENT_SECTION_PERMISSIONS_LEVEL_BY_ROLE = {
  soumissionnaire: PERMISSION_LEVEL['modification'],
  gestion: PERMISSION_LEVEL['effacement'],
  laboratoire: PERMISSION_LEVEL['modification'],
  consultation: PERMISSION_LEVEL['consultation'],
}

const SPECIMEN_SECTION_PERMISSIONS_LEVEL_BY_ROLE = {
  soumissionnaire: PERMISSION_LEVEL['modification'],
  gestion: PERMISSION_LEVEL['effacement'],
  laboratoire: PERMISSION_LEVEL['modification'],
  consultation: PERMISSION_LEVEL['consultation'],
}

const ANALYSIS_SECTION_PERMISSIONS_LEVEL_BY_ROLE = {
  soumissionnaire: PERMISSION_LEVEL['consultation'],
  gestion: PERMISSION_LEVEL['effacement'],
  laboratoire: PERMISSION_LEVEL['modification'],
  consultation: PERMISSION_LEVEL['consultation'],
}

const getPermissionRoleForProgram = (user, programId) => {
  if (!user) {
    return 0
  }

  const { permissions = [] } = user

  const permissionForProgram = permissions.find(p => p.programId == programId)
  const permissionRoleForProgram = permissionForProgram?.role
  return permissionRoleForProgram ?? 0
}

const getCanForEventSection = (user, programId, minimumRoleLevel = 8) => {
  const permissionRoleForProgram = getPermissionRoleForProgram(user, programId)
  const effectivePermission = EVENT_SECTION_PERMISSIONS_LEVEL_BY_ROLE[permissionRoleForProgram] ?? 0
  return effectivePermission >= minimumRoleLevel
}

const userCanViewEventSection = (user, programId) => {
  return getCanForEventSection(user, programId, PERMISSION_LEVEL['consultation'])
}

const userCanEditEventSection = (user, programId) => {
  return getCanForEventSection(user, programId, PERMISSION_LEVEL['modification'])
}

const getCanForSpecimenSection = (user, programId, minimumRoleLevel = 8) => {
  const permissionRoleForProgram = getPermissionRoleForProgram(user, programId)
  const effectivePermission = SPECIMEN_SECTION_PERMISSIONS_LEVEL_BY_ROLE[permissionRoleForProgram] ?? 0
  return effectivePermission >= minimumRoleLevel
}

const userCanViewSpecimenSection = (user, programId) => {
  return getCanForSpecimenSection(user, programId, PERMISSION_LEVEL['consultation'])
}

const userCanEditSpecimenSection = (user, programId) => {
  return getCanForSpecimenSection(user, programId, PERMISSION_LEVEL['modification'])
}

const userCanAddSpecimen = (user, programId) => {
  return getCanForSpecimenSection(user, programId, PERMISSION_LEVEL['ajout'])
}

const userCanDeleteSpecimen = (user, programId) => {
  return getCanForSpecimenSection(user, programId, PERMISSION_LEVEL['effacement'])
}

const getCanForAnalysisSection = (user, programId, minimumRoleLevel = 8) => {
  const permissionRoleForProgram = getPermissionRoleForProgram(user, programId)
  const effectivePermission = ANALYSIS_SECTION_PERMISSIONS_LEVEL_BY_ROLE[permissionRoleForProgram] ?? 0
  return effectivePermission >= minimumRoleLevel
}

const userCanEditAnalysisSection = (user, programId) => {
  return getCanForAnalysisSection(user, programId, PERMISSION_LEVEL['modification'])
}

const userCanAddAnalysis= (user, programId) => {
  return getCanForAnalysisSection(user, programId, PERMISSION_LEVEL['ajout'])
}

const userCanDeleteAnalysis = (user, programId) => {
  return getCanForAnalysisSection(user, programId, PERMISSION_LEVEL['effacement'])
}

export {
  canUserExport,
  canUserSubmitEvent,

  canUserSubmitInProgram,
  canUserViewProgram,

  filterSubmitablePrograms,
  filterViewablePrograms, isUserAdmin, userCanAddAnalysis, userCanAddSpecimen, userCanDeleteAnalysis, userCanDeleteSpecimen, userCanEditEventSection, userCanEditSpecimenSection, userCanViewEventSection,

  userCanViewSpecimenSection,
  userCanEditAnalysisSection
}

